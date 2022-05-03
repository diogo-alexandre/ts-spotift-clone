import { PassThrough } from 'stream';

export interface Local {
  save: (path: string, filename: string, pass: PassThrough) => Promise<{ size: number }>
}
