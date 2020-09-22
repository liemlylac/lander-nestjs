import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { CreateHouseDTO } from '../dto/create-house.dto';
import { EditHouseDTO } from '../dto/edit-house.dto';
import { HouseEntity } from '../entity/house.entity';
import { HouseRepository } from '../repository/house.repository';
import { CreateHouseRO } from '../ro/create-house.ro';
import { EditHouseRO } from '../ro/edit-house.ro';
import { HouseRO } from '../ro/house.ro';

@Injectable()
export class HouseService {
  private readonly logger = new Logger(HouseService.name);

  constructor(private readonly houseRepository: HouseRepository) {}

  async getAll(filter) {
    const houses = await this.houseRepository.getAllByFilter(filter);
    return houses.map(house =>
      plainToClass(HouseRO, house, { excludeExtraneousValues: true }),
    );
  }

  async checkExist(id: number) {
    if (await this.houseRepository.checkExist(id)) {
      return true;
    }
    throw new NotFoundException();
  }

  async getById(id: number): Promise<HouseEntity> {
    const house = await this.houseRepository.getById(id);
    if (!house) {
      throw new NotFoundException();
    }
    return house;
  }

  async getOne(id): Promise<HouseRO> {
    const house = await this.getById(id);
    return plainToClass(HouseRO, house, { excludeExtraneousValues: true });
  }

  create(data: CreateHouseDTO): Promise<CreateHouseRO | void> {
    const house = this.houseRepository.create(data);
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

  async update(id: number, data: EditHouseDTO): Promise<EditHouseRO> {
    await this.getById(id);
    const house = await this.houseRepository.save(
      { id, ...data },
      { reload: true },
    );
    return plainToClass(EditHouseRO, house, { excludeExtraneousValues: true });
  }

  async delete(id: number): Promise<number | void> {
    await this.checkExist(id);
    return this.houseRepository
      .delete(id)
      .then((result: DeleteResult) => result.affected)
      .catch(error => {
        this.logger.error(error);
      });
  }
}
