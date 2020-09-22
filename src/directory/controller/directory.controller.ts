import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { DistrictListRO } from '../ro/district-list.ro';
import { RegionListRO } from '../ro/region-list.ro';
import { WardListRO } from '../ro/ward-list.ro';
import { DirectoryService } from '../service/directory.service';

@ApiTags('Directory')
@Controller('directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @ApiOkResponse({ type: RegionListRO })
  @ApiImplicitParam({ name: 'country' })
  @Get('/region/:country')
  getRegion(@Param('country') code) {
    return this.directoryService.getRegionList(code);
  }

  @ApiOkResponse({ type: DistrictListRO })
  @ApiImplicitParam({ name: 'regionId' })
  @Get('/district/:regionId')
  getDistrict(@Param('regionId', ParseIntPipe) id) {
    return this.directoryService.getDistrictList(id);
  }

  @ApiOkResponse({ type: WardListRO })
  @ApiImplicitParam({ name: 'districtId' })
  @Get('/ward/:districtId')
  getWard(@Param('districtId', ParseIntPipe) id) {
    return this.directoryService.getWardList(id);
  }
}
