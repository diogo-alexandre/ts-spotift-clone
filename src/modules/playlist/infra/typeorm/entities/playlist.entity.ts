import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../../user/infra/typeorm/entities/user.entity';

@Entity({ name: 'playlists' })
export class Playlist {
  @PrimaryGeneratedColumn('increment')
  id!: string

  @ManyToOne(type => User, user => user.playlists)
  @JoinTable({ name: 'user_id' })
  user!: User

  @Column()
  name!: string

  @Column()
  about!: string

  @CreateDateColumn()
  createdAt!: Date
}
