import { EntityRepository, Repository } from 'typeorm';
import { RegionEntity } from '../entity/region.entity';

@EntityRepository(RegionEntity)
export class RegionRepository extends Repository<RegionEntity> {
  loadByCountryCode(countryCode: string, active) {
    const condition: any = {
      countryCode,
    };
    if (active) {
      condition.active = true;
    }
    return this.find(condition);
  }
}
