import { Injectable } from '@nestjs/common';
import { DistrictRepository } from '../repository/district.repository';
import { RegionRepository } from '../repository/region.repository';
import { WardRepository } from '../repository/ward.repository';

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
