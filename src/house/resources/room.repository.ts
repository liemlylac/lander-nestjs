import { EntityRepository, Repository } from 'typeorm';
import { Room } from '../entities';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
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
