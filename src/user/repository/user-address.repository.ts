import { EntityRepository, Repository } from 'typeorm';
import { UserAddressEntity } from '../entity/user-address.entity';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserAddressRepository extends Repository<UserAddressEntity> {}
