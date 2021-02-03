import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RegisterDto, AuthService } from '../../auth';
import { EditUserDto } from '../dto/';
import { User } from '../entities';
import { UserRepository } from '../resources';
import { UserProfileRO } from '../ro';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  constructor(
    private readonly userRepo: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async getById(id: string): Promise<User> {
    const user = await this.userRepo.getById(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async mapProfile(user: User) {
    return plainToClass(UserProfileRO, user, {
      excludeExtraneousValues: true,
      groups: ['profile'],
    });
  }

  async view(id: string): Promise<UserProfileRO> {
    const user: User = await this.getById(id);
    return plainToClass(UserProfileRO, user, {
      excludeExtraneousValues: true,
      groups: ['view'],
    });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepo.getByEmail(email);
  }

  async validateEmailTaken(email: string) {
    if (await this.userRepo.isEmailExist(email)) {
      throw new ConflictException({
        code: 'EMAIL_IS_ALREADY_IN_USE',
        message:
          'That email address is already in use, please use a different email address',
      });
    }
  }

  async create(data: RegisterDto): Promise<User> {
    await this.validateEmailTaken(data.email);
    const user = this.userRepo.create({ ...data, country: 'VN' });
    user.password = await this.authService.hashPassword(data.password);
    try {
      return await this.userRepo.save(user, { reload: true });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async edit(id: string, user: EditUserDto) {
    try {
      await this.userRepo.update(id, user);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async resetPassword(email: string, password: string) {
    const account = await this.getByEmail(email);
    account.password = await this.authService.hashPassword(password);
    try {
      await this.userRepo.update(account.id, account);
      return account;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
