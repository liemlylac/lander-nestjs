import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomService } from './services';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/house/:houseId')
  getAllByHouseId(@Param('houseId', new ParseIntPipe()) houseId: number) {
    return this.roomService.getAllByHouseId(houseId);
  }

  @Get('/block/:blockId')
  getAllByBlockId(@Param('blockId', new ParseIntPipe()) blockId: number) {
    return this.roomService.getAllByBlockId(blockId);
  }

  @Get('/:roomId')
  getById(@Param('roomId', new ParseIntPipe()) roomId: number) {
    return this.roomService.getById(roomId);
  }
}
