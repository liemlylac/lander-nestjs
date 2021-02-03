import { Injectable } from '@nestjs/common';
import { BlockRepository } from '../resources';

@Injectable()
export class BlockService {
  constructor(private readonly blockResource: BlockRepository) {}

  getAllByHouseId(id: number) {
    return this.blockResource.getAllByHouseId(id);
  }

  getById(id: number) {
    return this.blockResource.getById(id);
  }
}
