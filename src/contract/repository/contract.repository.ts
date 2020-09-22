import { EntityRepository, Repository } from 'typeorm';
import { ContractEntity } from '../entity/contract.entity';

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity> {}
