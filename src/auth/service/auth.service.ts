import { MailService } from '@core/services/mail.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/entity/user.entity';
import { UserService } from '../../user/services/user.service';
import { RegisterDTO } from '../dto/register.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { PermissionRepository } from '../repository/permission.repository';
import { LoginRO } from '../ro/login.ro';
import { CryptoService } from './crypto.service';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
    private readonly permissionRepository: PermissionRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async validateLogin(email, password) {
    const user = await this.validateUser(email);
    if (user && (await this.hashService.compareHash(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUser(email: string) {
    const account = await this.userService.getByEmail(email);
    if (account && account.active) {
      return account;
    }
    return null;
  }

  generatePassword(password) {
    return this.hashService.hashPassword(password);
  }

  async afterLogin(user: UserEntity, loginType = 'password'): Promise<LoginRO> {
    const payload = { id: user.id, email: user.email, loginType };
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(register: RegisterDTO): Promise<LoginRO> {
    const newUser = await this.userService.create(register);
    return this.afterLogin(newUser);
  }

  async requestPassword(email: string) {
    const user = await this.userService.getByEmail(email);
    if (!user || !user.active) {
      return { email };
    }
    const content = {
      userId: user.id,
      valid:
        new Date().getTime() +
        Number(this.configService.get('auth.pwd.resetTokenLifeTime')),
    };
    const token = this.cryptoService.generateCipherToken(content);

    this.sendMailRequestPassword(user, token).catch(error => {
      this.logger.error(error);
    });

    return { success: true, email };
  }

  verifyResetPasswordToken(resetPwdToken: string): boolean {
    const tokenContent = this.decodeToken(resetPwdToken);
    this.verifyTokenExp(tokenContent);
    return true;
  }

  async resetPassword(token: string, resetPassword: ResetPasswordDTO) {
    const tokenContent = this.decodeToken(token);
    this.verifyTokenExp(tokenContent);
    const account = await this.userService.resetPassword(
      tokenContent.userId,
      resetPassword.password,
    );
    this.sendMailResetPassword(account).catch(error => {
      this.logger.error(error);
    });
    return { email: account.email };
  }

  protected verifyTokenExp(tokenContent) {
    if (new Date().getTime() > tokenContent.valid) {
      throw new BadRequestException('Token has been expired.');
    }
  }

  protected decodeToken(token) {
    try {
      return this.cryptoService.decodeCipherFromToken(token);
    } catch (exception) {
      this.logger.error(exception);
      throw new BadRequestException('Invalid token');
    }
  }

  protected async sendMailRequestPassword(user: UserEntity, token) {
    const resetTokenLifeTime = this.configService.get(
      'auth.pwd.resetTokenLifeTime',
    ); // unit ms. Default: 1,800,000ms ~ 1,800s ~ 30m

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

  protected async sendMailResetPassword(user: UserEntity) {
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
}
