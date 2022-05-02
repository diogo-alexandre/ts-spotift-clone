import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class TransformDataPipe <T> implements PipeTransform {
  private readonly metatype: ClassConstructor<T>

  constructor (metatype: ClassConstructor<T>) {
    this.metatype = metatype;
  }

  transform (value: any, metadata: ArgumentMetadata): T {
    return plainToInstance(this.metatype ?? metadata.metatype, value);
  }
}
