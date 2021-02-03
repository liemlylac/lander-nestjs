import { EntityRepository, Repository } from 'typeorm';
import { Contract } from '../entities';

@EntityRepository(Contract)
export class ContractRepository extends Repository<Contract> {
  getList() {
    return this.find();
  }

  active(id) {
    return this.save({ id, active: true });
  }

  deActive(id) {
    return this.save({ id, active: false });
  }
}
