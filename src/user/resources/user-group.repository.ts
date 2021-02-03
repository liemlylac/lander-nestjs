import { EntityRepository, Repository } from 'typeorm';
import { UserGroup } from '../entities';

@EntityRepository(UserGroup)
export class UserGroupRepository extends Repository<UserGroup> {}
