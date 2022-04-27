import { Profile } from '../../infra/typeorm/entities/profile.entity';

export interface IProfileRepository {
  findById: (id: string) => Promise<Profile | null>
}
