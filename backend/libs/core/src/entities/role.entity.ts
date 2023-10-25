import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRoles } from '../enums/user-roles.enum';
import { BaseEntity } from './base.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'text', unique: true })
  name!: UserRoles;

  @OneToMany(type => UserEntity, user => user.role)
  users?: UserEntity[];
}
