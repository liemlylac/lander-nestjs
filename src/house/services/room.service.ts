import { Injectable } from '@nestjs/common';
import { RoomRepository } from '../resources';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  getAllByHouseId(houseId: number) {
    return this.roomRepository.getAllByHouseId(houseId);
  }

  getAllByBlockId(blockId: number) {
    return this.roomRepository.getAllByBlockId(blockId);
  }

  getById(id: number) {
    return this.roomRepository.getById(id);
  }
}
