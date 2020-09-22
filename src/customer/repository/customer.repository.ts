import { EntityRepository, Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {
  getByEmail(email: string) {
    return this.findOne({ email });
  }
}
