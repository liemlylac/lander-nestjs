import { EntityRepository, Repository } from 'typeorm';
import { District } from '../entities';

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {
  loadByRegionId(regionId: number, active): Promise<District[]> {
    const condition: any = {
      regionId,
    };
    if (active) {
      condition.active = true;
    }
    return this.find(condition);
  }
}
