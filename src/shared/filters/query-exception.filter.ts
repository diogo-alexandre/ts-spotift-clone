import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import crypto from 'crypto';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch (exception: QueryFailedError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if (exception.driverError.errno === 1062) {
      const value = exception.driverError.sqlMessage.split('\'')[1];

      return response
        .status(409)
        .json({
          message: 'Conflict',
          response: [
            {
              property: Object.keys(request.body).filter(key => request.body[key] === value)[0],
              reason: {
                code: (crypto.createHash('md4').update('isUnique').digest('hex')).slice(0, 5),
                message: 'Already exists an entry with same value.'
              }
            }
          ]
        });
    } else {
      console.error(exception);

      return response
        .status(500)
        .json({
          statusCode: 500,
          message: 'Internal Server Error'
        });
    }
  }
}
