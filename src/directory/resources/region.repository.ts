import { EntityRepository, Repository } from 'typeorm';
import { Region } from '../entities';

@EntityRepository(Region)
export class RegionRepository extends Repository<Region> {
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
