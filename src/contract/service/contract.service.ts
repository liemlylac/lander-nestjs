import { Injectable } from '@nestjs/common';
import { ContractRepository } from '../repository/contract.repository';

@Injectable()
export class ContractService {
  constructor(private readonly contractRepository: ContractRepository) {}
}
