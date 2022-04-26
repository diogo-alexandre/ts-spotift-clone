import { TypeOrmConfig } from './src/shared/config/typeorm.config';
import 'dotenv/config';

export default new TypeOrmConfig({ get: (property: string) => process.env[property] } as any);
