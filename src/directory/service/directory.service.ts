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

  getRegionList(countryCode: string) {
    return this.regionRepo.loadByCountryCode(countryCode);
  }

  getDistrictList(regionId: number) {
    return this.districtRepo.loadByRegionId(regionId);
  }

  getWardList(districtId: number) {
    return this.wardRepo.loadByDistrictId(districtId);
  }
}
