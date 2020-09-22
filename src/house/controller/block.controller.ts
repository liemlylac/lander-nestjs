import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlockService } from '../service/block.service';

@ApiTags('block')
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get('/house/:houseId')
  getAllByHouseId(@Param('houseId', new ParseIntPipe()) houseId: number) {
    return this.blockService.getAllByHouseId(houseId);
  }

  @Get('/:blockId')
  getById(@Param('blockId', new ParseIntPipe()) blockId: number) {
    return this.blockService.getById(blockId);
  }
}
