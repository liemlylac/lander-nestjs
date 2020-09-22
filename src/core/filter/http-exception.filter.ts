import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService) {}

  // noinspection JSUnusedGlobalSymbols
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (
      status === 500 &&
      this.configService.get<boolean>('loggingInternalServerError')
    ) {
      this.logger.log({
        request: `${request.method} ${request.url}`,
        requestBody: `${JSON.stringify(request.body)}`,
        response: `${status} ${exception.message}`,
      });
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
