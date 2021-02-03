import { EntityRepository, Repository } from 'typeorm';
import { UserAddress, User } from '../entities';

@EntityRepository(User)
export class UserAddressRepository extends Repository<UserAddress> {}
