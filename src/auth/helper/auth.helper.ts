import { NotFoundException } from '@nestjs/common';
import { AccountType } from '../account-type.enum';

/**
 * Allow login path:
 *  - /admin/login
 *  - /user/login
 *  - /customer/login
 */
export function getAccountType(url: string) {
  const urlPaths = url.split('/');
  if (urlPaths.length > 2) {
    return urlPaths[1] as AccountType;
  }
  throw new NotFoundException('Incorrect login URL');
}
