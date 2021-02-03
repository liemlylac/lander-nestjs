import { Injectable } from '@nestjs/common';
import { DistrictRepository } from '../resources/district.repository';
import { RegionRepository } from '../resources/region.repository';
import { WardRepository } from '../resources/ward.repository';

@Injectable()
export class DirectoryService {
  constructor(
    private readonly regionRepo: RegionRepository,
    private readonly districtRepo: DistrictRepository,
    private readonly wardRepo: WardRepository,
  ) {}

  getRegionList(countryCode: string, active?: boolean) {
    return this.regionRepo.loadByCountryCode(countryCode, active);
  }

  getDistrictList(regionId: number, active?: boolean) {
    return this.districtRepo.loadByRegionId(regionId, active);
  }

  getWardList(districtId: number, active?: boolean) {
    return this.wardRepo.loadByDistrictId(districtId, active);
  }
}
