import { EntityRepository, Repository } from 'typeorm';
import { RoomEntity } from '../entity/room.entity';

@EntityRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {
  getAllByHouseId(houseId: number) {
    return this.find({ houseId });
  }

  getAllByBlockId(blockId: number) {
    return this.find({ blockId });
  }

  getById(id: number) {
    return this.findOne({ id });
  }
}
