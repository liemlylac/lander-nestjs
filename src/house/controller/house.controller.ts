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
import { CreateHouseDTO } from '../dto/create-house.dto';
import { EditHouseDTO } from '../dto/edit-house.dto';
import { HouseService } from '../service/house.service';

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
  create(@Body() data: CreateHouseDTO) {
    return this.houseService.create(data);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id, @Body() data: EditHouseDTO) {
    return this.houseService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.houseService.delete(id);
  }
}
