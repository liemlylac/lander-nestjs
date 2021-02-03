import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getById(id: string) {
    return this.findOne({ id });
  }

  getByEmail(email, active = true) {
    return this.findOne({ email, active });
  }

  async isEmailExist(email): Promise<boolean> {
    return (await this.count({ where: { email } })) > 0;
  }
}
