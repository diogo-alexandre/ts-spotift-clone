import { Virtual } from '../environments/virtual.environment';
import { Local } from '../environments/local.environment';

export type IStorageRepository <T extends Local | Virtual > = T
