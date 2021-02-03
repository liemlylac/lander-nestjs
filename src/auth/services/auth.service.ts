import { HashService } from '@app/common';
import { MailService } from '@app/mail';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from '../../user';
import { authConfig, AuthConfig } from '../auth.config';
import { getSignatureFromJWT } from '../auth.helper';
import {
  DeviceDto,
  LoginResultDto,
  LogoutDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
} from '../dto';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfig: AuthConfig,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly mailService: MailService,
    private readonly sessionService: SessionService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getValidUser(email, password): Promise<User | null> {
    const user = await this.getActiveUserByEmail(email);
    const pepper = this.authConfig.pepper;
    if (
      user &&
      (await this.hashService.compareHash(password, user.password, pepper))
    ) {
      return user;
    }
    return null;
  }

  async getActiveUserByEmail(email: string): Promise<User | null> {
    const account = await this.userService.getByEmail(email);
    if (account && account.active) {
      return account;
    }
    return null;
  }

  hashPassword(password: string): Promise<string> {
    const pepper = this.authConfig.pepper;
    return this.hashService.hash(password, pepper);
  }

  generateTokens(user, loginType = 'password') {
    const payload = { id: user.id, email: user.email, loginType };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.authConfig.accessTokenSecret,
        expiresIn: this.authConfig.accessTokenLifetime,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.authConfig.refreshTokenSecret,
        expiresIn: this.authConfig.refreshTokenLifetime,
      }),
    };
  }

  async createSession(clientDto: DeviceDto): Promise<{ clientId: string }> {
    const session = await this.sessionService.saveSession(clientDto);
    return { clientId: session.deviceId };
  }

  async login(user: User): Promise<LoginResultDto> {
    const tokenPack = this.generateTokens(user);
    const sessionData = {
      userId: user.id,
      signature: getSignatureFromJWT(tokenPack.refreshToken),
    };
    const session = await this.sessionService.saveSession(sessionData);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      token: { clientId: session.deviceId, ...tokenPack },
    };
  }

  async register(register: RegisterDto): Promise<LoginResultDto> {
    const newUser = await this.userService.create(register);
    return await this.login(newUser);
  }

  async requestPassword(email: string): Promise<{ email }> {
    const user = await this.userService.getByEmail(email);
    if (!user || !user.active) {
      return Promise.resolve({ email });
    }

    const token = await this.generateResetPasswordToken(user);

    this.sendMailRequestPassword(user, token).catch(error => {
      this.logger.error(error);
    });

    return Promise.resolve({ email });
  }

  generateResetPasswordToken(user: User): Promise<string> {
    const content = {
      email: user.email,
    };

    return this.jwtService.signAsync(content, {
      expiresIn: this.authConfig.resetTokenLifeTime,
      secret: this.hashService.getSalt(user.password),
    });
  }

  async verifyResetPasswordToken(resetPwdToken: string): Promise<boolean> {
    const payload = await this.verifyOneTimeToken(resetPwdToken);
    return !!payload.email;
  }

  protected async verifyOneTimeToken(token): Promise<any> {
    try {
      const tokenContent: any = this.jwtService.decode(token, { json: true });
      const user = await this.getActiveUserByEmail(tokenContent.email);
      return await this.jwtService.verifyAsync(token, {
        secret: this.hashService.getSalt(user.password),
      });
    } catch (e) {
      throw new BadRequestException('Token is invalid.');
    }
  }

  async resetPassword(token, resetPassword: ResetPasswordDto) {
    const payload: any = await this.verifyOneTimeToken(token);
    const account = await this.userService.resetPassword(
      payload.email,
      resetPassword.password,
    );
    this.sendMailResetPassword(account).catch(error => {
      this.logger.error(error);
    });
    return { email: account.email };
  }

  protected async sendMailRequestPassword(user: User, token) {
    const resetTokenLifeTime = this.authConfig.resetTokenLifeTime; // unit ms. Default: 1,800,000ms ~ 1,800s ~ 30m

    /**
     * Prepare data for template mail
     */
    const data = {
      to: user.email,
      subject: 'Request to reset password',
      template: 'request-password',
      context: {
        metaTitle: 'Request to reset password',
        metaDescription:
          'You recently request to reset your password for Lander account',
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        token: token,
        resetTokenLifeTime: resetTokenLifeTime / 60000, //convert to minutes
      },
    };

    try {
      const sendMailInfo = await this.mailService.sendMail(data);
      return sendMailInfo.accepted.join();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  protected async sendMailResetPassword(user: User) {
    /**
     * Prepare data for template mail
     */
    const data = {
      to: user.email,
      subject: 'Password changed',
      template: 'reset-password',
      context: {
        metaTitle: 'Password changed',
        metaDescription: 'Your Lander password has been changed',
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    };

    try {
      const sendMailInfo = await this.mailService.sendMail(data);
      return sendMailInfo.accepted.join();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  verifyRefreshToken(refreshToken): any {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.authConfig.refreshTokenSecret,
      });
    } catch (err) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async refreshToken(tokens: RefreshTokenDto) {
    const payload = this.verifyRefreshToken(tokens.refreshToken);
    const user = await this.userService.getById(payload.id);
    const tokenPack = this.generateTokens(user);
    const signature = getSignatureFromJWT(tokenPack.refreshToken);
    const session = await this.sessionService.getSession(
      user.id,
      tokens.clientId,
    );
    if (!session || signature !== session.signature) {
      throw new UnauthorizedException();
    }
    session.signature = signature;
    await this.sessionService.saveSession(session);
    return { clientId: session.deviceId, ...tokenPack };
  }

  async logout(logoutDto: LogoutDto): Promise<void> {
    await this.sessionService.removeSession(
      logoutDto.userId,
      logoutDto.clientId,
    );
    return;
  }
}
