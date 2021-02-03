import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractService } from './services';

@ApiTags('Contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('list')
  getList() {
    return this.contractService.getList();
  }

  @Post('create')
  create(@Body() data) {
    return this.contractService.create(data);
  }

  @Put('update/:id')
  update(@Param('id') id, @Body() data) {
    return this.contractService.update(id, data);
  }

  @Post('clone')
  clone(@Body() data) {
    return this.contractService.clone(data);
  }

  @Put('finish/:id')
  finish(@Param('id') id, @Body() body) {
    return this.contractService.finish(id, body.finishDate);
  }

  @Put('active/:id')
  active(@Param('id') id) {
    return this.contractService.active(id);
  }

  @Put('deActive/:id')
  deActive(@Param('id') id) {
    return this.contractService.deActive(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id) {
    return this.contractService.delete(id);
  }
}
