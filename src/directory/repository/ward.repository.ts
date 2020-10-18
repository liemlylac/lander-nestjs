import { EntityRepository, Repository } from 'typeorm';
import { WardEntity } from '../entity/ward.entity';

@EntityRepository(WardEntity)
export class WardRepository extends Repository<WardEntity> {
  loadByDistrictId(districtId, active): Promise<WardEntity[]> {
    const condition: any = {
      districtId,
    };
    if (active) {
      condition.active = true;
    }
    return this.find(condition);
  }
}
