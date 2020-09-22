import { EntityRepository, Repository } from 'typeorm';
import { DistrictEntity } from '../entity/district.entity';

@EntityRepository(DistrictEntity)
export class DistrictRepository extends Repository<DistrictEntity> {
  loadByRegionId(regionId): Promise<DistrictEntity[]> {
    return this.find({ regionId });
  }
}
