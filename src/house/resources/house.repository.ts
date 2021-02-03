import { EntityRepository, FindManyOptions, Like, Repository } from 'typeorm';
import { House } from '../entities';

@EntityRepository(House)
export class HouseRepository extends Repository<House> {
  async checkExist(id: number) {
    return (await this.count({ id })) > 0;
  }

  getById(id: number) {
    return this.findOne({ where: { id } });
  }

  getAllByFilter(filter) {
    const options: FindManyOptions<House> = {};
    options.where = {};
    if (filter.regionId) {
      options.where.regionId = filter.regionId;
    }

    if (filter.districtId) {
      options.where.districtId = filter.districtId;
    }

    if (filter.wardId) {
      options.where.wardId = filter.wardId;
    }

    if (filter.isVerified) {
      options.where.isVerified = filter.isVerified;
    }

    if (filter.name) {
      options.where.name = Like(`%${filter.name}%`);
    }

    if (filter.phone) {
      options.where.phone = Like(`${filter.phone}%`);
    }

    return this.find(options);
  }
}
