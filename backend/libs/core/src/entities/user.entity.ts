import { RoleEntity } from './role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { VerificationCode } from './verification-codes.entity';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  username?: string;

  @Column()
  email?: string;

  @Column()
  password!: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ nullable: true })
  name?: string;

  @ManyToOne((type) => RoleEntity)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role?: RoleEntity;

  @Column({ name: 'role_id', nullable: true })
  roleId?: string;

  // @Column({ type: 'boolean', default: false })
  // verified?: boolean;

  // @OneToMany(
  //   (type) => VerificationCode,
  //   (verificationCode) => verificationCode.user,
  //   { cascade: true, nullable: true },
  // )
  // verificationCodes?: VerificationCode[];
}
