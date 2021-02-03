import { EntityRepository, Repository } from 'typeorm';
import { Block } from '../entities';

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {
  getAllByHouseId(houseId: number) {
    return this.find({ houseId: houseId });
  }

  getById(id: number) {
    return this.findOne({ id });
  }
}
