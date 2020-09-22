import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../../auth/service/auth.service';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    private readonly customerRepo: CustomerRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  getByEmail(email: string) {
    return this.customerRepo.getByEmail(email);
  }
}
