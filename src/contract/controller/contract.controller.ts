import { Controller } from '@nestjs/common';
import { ContractService } from '../service/contract.service';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}
}
