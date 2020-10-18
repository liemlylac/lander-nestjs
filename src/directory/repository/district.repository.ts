import { EntityRepository, Repository } from 'typeorm';
import { DistrictEntity } from '../entity/district.entity';

@EntityRepository(DistrictEntity)
export class DistrictRepository extends Repository<DistrictEntity> {
  loadByRegionId(regionId: number, active): Promise<DistrictEntity[]> {
    const condition: any = {
      regionId,
    };
    if (active) {
      condition.active = true;
    }
    return this.find(condition);
  }
}
