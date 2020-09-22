import { EntityRepository, Repository } from 'typeorm';
import { WardEntity } from '../entity/ward.entity';

@EntityRepository(WardEntity)
export class WardRepository extends Repository<WardEntity> {
  loadByDistrictId(districtId): Promise<WardEntity[]> {
    return this.find({ districtId });
  }
}
