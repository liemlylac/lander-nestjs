import { EntityRepository, Repository } from 'typeorm';
import { Resource } from '../entities';

@EntityRepository(Resource)
export class ResourceRepository extends Repository<Resource> {}
