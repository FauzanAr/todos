import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;
    response.status(status).send({
      errors: exception.errors.map((err) => ({
        path: err.path,
        message: err.message,
        code: err.code,
      })),
      message: exception.message,
      statusCode: status,
    });
  }
}
