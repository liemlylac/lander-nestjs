import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { CreateHouseDto, EditHouseDto } from '../dto';
import { House } from '../entities';
import { HouseRepository } from '../resources';
import { CreateHouseRO, EditHouseRO, HouseRO } from '../ro';

@Injectable()
export class HouseService {
  private readonly logger = new Logger(HouseService.name);

  constructor(private readonly houseResource: HouseRepository) {}

  async getAll(filter) {
    const houses = await this.houseResource.getAllByFilter(filter);
    return houses.map(house =>
      plainToClass(HouseRO, house, { excludeExtraneousValues: true }),
    );
  }

  async checkExist(id: number) {
    if (await this.houseResource.checkExist(id)) {
      return true;
    }
    throw new NotFoundException();
  }

  async getById(id: number): Promise<House> {
    const house = await this.houseResource.getById(id);
    if (!house) {
      throw new NotFoundException();
    }
    return house;
  }

  async getOne(id): Promise<HouseRO> {
    const house = await this.getById(id);
    return plainToClass(HouseRO, house, { excludeExtraneousValues: true });
  }

  create(data: CreateHouseDto): Promise<CreateHouseRO | void> {
    const house = this.houseResource.create(data);
    return house
      .save({ reload: true })
      .then(house =>
        plainToClass(CreateHouseRO, house, {
          excludeExtraneousValues: true,
        }),
      )
      .catch(error => {
        this.logger.error(error);
      });
  }

  async update(id: number, data: EditHouseDto): Promise<EditHouseRO> {
    await this.getById(id);
    const house = await this.houseResource.save(
      { id, ...data },
      { reload: true },
    );
    return plainToClass(EditHouseRO, house, { excludeExtraneousValues: true });
  }

  async delete(id: number): Promise<number | void> {
    await this.checkExist(id);
    return this.houseResource
      .delete(id)
      .then((result: DeleteResult) => result.affected)
      .catch(error => {
        this.logger.error(error);
      });
  }
}
