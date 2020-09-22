import { EntityRepository, Repository } from 'typeorm';
import { RegionEntity } from '../entity/region.entity';

@EntityRepository(RegionEntity)
export class RegionRepository extends Repository<RegionEntity> {
  loadByCountryCode(countryCode) {
    return this.find({ countryCode });
  }
}
