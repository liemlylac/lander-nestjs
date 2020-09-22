import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { JwtConfig } from './passport/jwt.config';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { ActionRepository } from './repository/action.repository';
import { PermissionRepository } from './repository/permission.repository';
import { ResourceRepository } from './repository/resource.repository';
import { RoleRepository } from './repository/role.repository';
import { AuthService } from './service/auth.service';
import { CryptoService } from './service/crypto.service';
import { HashService } from './service/hash.service';
import { RoleService } from './service/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleRepository,
      ResourceRepository,
      ActionRepository,
      PermissionRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfig }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    CryptoService,
    LocalStrategy,
    JwtStrategy,
    RoleService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
