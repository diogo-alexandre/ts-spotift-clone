import path from 'path';

export const AppConstants = {
  __rootdir: path.resolve(__dirname, '..', '..', '..'),
  address: 'http://localhost:3333',
  aws: {
    s3: {
      bucket: 'storage'
    }
  }
};
