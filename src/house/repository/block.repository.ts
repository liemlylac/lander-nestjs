import { EntityRepository, Repository } from 'typeorm';
import { BlockEntity } from '../entity/block.entity';

@EntityRepository(BlockEntity)
export class BlockRepository extends Repository<BlockEntity> {
  getAllByHouseId(houseId: number) {
    return this.find({ houseId: houseId });
  }

  getById(id: number) {
    return this.findOne({ id });
  }
}
