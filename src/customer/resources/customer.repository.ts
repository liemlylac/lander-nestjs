import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  getByEmail(email: string) {
    return this.findOne({ email });
  }
}
