import { ParseArrayPipe, UploadedFile, UploadedFiles } from '@nestjs/common';
import { File as FileEntity } from '../entities/file.entity';
import { TransformDataPipe } from '../pipes/transform.pipe';

export const Files = (): ParameterDecorator => UploadedFiles(new ParseArrayPipe({ items: FileEntity }));
export const Source = (key?: string): ParameterDecorator => UploadedFile(key, new TransformDataPipe(FileEntity));
