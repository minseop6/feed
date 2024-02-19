import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import {
  AccountNotFoundException,
  DuplicateEmailException,
  FeedNotFoundException,
  InvalidAccountException,
  InvalidSchoolMappingException,
  SchoolNotFoundException,
} from 'src/type/exception';
import { BaseException } from 'src/type/exception/base.exception';
import { InvalidFeedException } from 'src/type/exception/invalid-feed-exception';

@Catch(AccountNotFoundException, FeedNotFoundException, SchoolNotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 404;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}

@Catch(
  DuplicateEmailException,
  InvalidAccountException,
  InvalidFeedException,
  InvalidSchoolMappingException,
)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 400;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
