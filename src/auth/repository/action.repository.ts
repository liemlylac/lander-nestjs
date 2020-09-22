import { EntityRepository, Repository } from 'typeorm';
import { ActionEntity } from '../entity/action.entity';

@EntityRepository(ActionEntity)
export class ActionRepository extends Repository<ActionEntity> {}
