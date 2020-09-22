import { Injectable } from '@nestjs/common';
import { BlockRepository } from '../repository/block.repository';

@Injectable()
export class BlockService {
  constructor(private readonly blockRepository: BlockRepository) {}

  getAllByHouseId(id: number) {
    return this.blockRepository.getAllByHouseId(id);
  }

  getById(id: number) {
    return this.blockRepository.getById(id);
  }
}
