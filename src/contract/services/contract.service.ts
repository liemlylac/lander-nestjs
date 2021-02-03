import { Injectable } from '@nestjs/common';
import { ContractRepository } from '../resources';

@Injectable()
export class ContractService {
  constructor(private readonly contractRepo: ContractRepository) {}

  getList() {
    return this.contractRepo.getList();
  }

  getOne(id) {
    return this.contractRepo.findOne(id);
  }

  create(data) {
    const contract = this.contractRepo.create(data);
    return this.contractRepo.save(contract);
  }

  update(id: number, data) {
    return this.contractRepo.update(id, data);
  }

  async clone(data) {
    const oldContract = await this.contractRepo.findOne(data.oldContractId);
    const newContract = this.contractRepo.create(oldContract);
    return this.contractRepo.save(newContract);
  }

  finish(id, finishDate) {
    return this.contractRepo.update(id, { finishDate });
  }

  active(id) {
    return this.contractRepo.active(id);
  }

  deActive(id) {
    return this.contractRepo.deActive(id);
  }

  delete(id) {
    return this.contractRepo.delete(id);
  }
}
