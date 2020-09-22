import { EntityRepository, Repository } from 'typeorm';
import { ResourceEntity } from '../entity/resource.entity';

@EntityRepository(ResourceEntity)
export class ResourceRepository extends Repository<ResourceEntity> {}
