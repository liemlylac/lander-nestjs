import { EntityRepository, Repository } from 'typeorm';
import { Ward } from '../entities';

@EntityRepository(Ward)
export class WardRepository extends Repository<Ward> {
  loadByDistrictId(districtId, active): Promise<Ward[]> {
    const condition: any = {
      districtId,
    };
    if (active) {
      condition.active = true;
    }
    return this.find(condition);
  }
}
