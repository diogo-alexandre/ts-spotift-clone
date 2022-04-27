import { User } from '../../infra/typeorm/entities/user.entity';
import { CreateUserDTO } from '../../presentation/dtos/create-user.dto';

export interface IUserRepository {
  create: (userDTO: CreateUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
}
