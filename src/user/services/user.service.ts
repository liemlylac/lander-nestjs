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
import { RegisterDTO } from '../../auth/dto/register.dto';
import { AuthService } from '../../auth/service/auth.service';
import { EditUserDTO } from '../dto/edit-user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserProfileRO } from '../ro/user-profile.ro';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  constructor(
    private readonly userRepo: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepo.getById(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async profile(user: UserEntity) {
    return plainToClass(UserProfileRO, user, {
      excludeExtraneousValues: true,
      groups: ['profile'],
    });
  }

  async view(id: string): Promise<UserProfileRO> {
    const user: UserEntity = await this.getById(id);
    return plainToClass(UserProfileRO, user, {
      excludeExtraneousValues: true,
      groups: ['view'],
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
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

  async create(data: RegisterDTO): Promise<UserEntity> {
    await this.validateEmailTaken(data.email);
    const user = this.userRepo.create({ ...data, country: 'VN' });
    user.password = await this.authService.generatePassword(data.password);
    try {
      return await this.userRepo.save(user, { reload: true });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async edit(id: string, user: EditUserDTO) {
    try {
      await this.userRepo.update(id, user);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async resetPassword(id: string, password: string) {
    const account = await this.getById(id);
    account.password = await this.authService.generatePassword(password);
    try {
      await this.userRepo.update(id, account);
      return account;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
