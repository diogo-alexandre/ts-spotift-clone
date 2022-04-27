import { ArgumentMetadata, BadRequestException, ValidationError, ValidationPipe as DefaultValidationPipe } from '@nestjs/common';
import crypto from 'crypto';

class ValidationPipe extends DefaultValidationPipe {
  async transform (value: any, metadata: ArgumentMetadata): Promise<any> {
    this.exceptionFactory = (errors: ValidationError[]) => {
      throw new BadRequestException({
        message: 'Bad Request',
        response: errors.map(err => {
          const constraints = err.constraints ?? {};

          return {
            property: err.property,
            reasons: Object.keys(constraints).map(key => ({
              code: (crypto.createHash('md4').update(key).digest('hex')).slice(0, 5),
              message: constraints[key]
            }))
          };
        })
      });
    };

    return await super.transform(value, metadata);
  }
}

export default ValidationPipe;
