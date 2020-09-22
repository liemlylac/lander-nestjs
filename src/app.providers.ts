import { HttpExceptionFilter } from '@core/filter/http-exception.filter';
import { LoggingInterceptor } from '@core/interceptor/logging.interceptor';
import { TimeoutInterceptor } from '@core/interceptor/timeout.interceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';

export const providers = [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
];
