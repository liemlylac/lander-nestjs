import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateHouseDto, EditHouseDto } from './dto';
import { HouseService } from './services';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get()
  getAll(@Query() filter) {
    return this.houseService.getAll(filter);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id) {
    return this.houseService.getOne(id);
  }

  @Post()
  create(@Body() data: CreateHouseDto) {
    return this.houseService.create(data);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id, @Body() data: EditHouseDto) {
    return this.houseService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.houseService.delete(id);
  }
}
