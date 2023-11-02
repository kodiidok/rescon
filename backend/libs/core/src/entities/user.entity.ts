import { RoleEntity } from './role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { VerificationCode } from './verification-codes.entity';
import { BaseEntity } from './base.entity';
import { SessionEntity } from './session.entity';
import { SessionItemEntity } from './session-item.entity';

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
  @JoinColumn({ name: 'role_name', referencedColumnName: 'name' })
  role?: RoleEntity;

  @Column({ name: 'role_name', nullable: true })
  roleName?: string;

  @Column({ name: 'chairing_sessions', type: 'simple-array', nullable: true })
  chairingSessionIds?: string[];

  @ManyToMany(
    () => SessionEntity,
    (entity: SessionEntity) => entity.sessionChairs,
    { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  chairingSessions: SessionEntity[];

  @OneToMany(
    () => SessionItemEntity,
    (entity: SessionItemEntity) => entity.presenter,
  )
  presentingSessions: SessionItemEntity[];

  @Column({ nullable: true })
  nic?: string;
  
  @Column({ name: 'presenting_sessions', type: 'simple-array', nullable: true })
  presentingSessionIds?: string[];

  @Column({ nullable: true })
  institute: string;

  @Column({ nullable: true })
  registered: boolean;

  // @BeforeUpdate()
  // updateSessions() {
  //   // This is called before updating the user entity
  //   // Update the related sessions in the join table
  //   if (this.chairingSessions) {
  //     this.chairingSessions.forEach((session: SessionEntity) => {
  //       // Update any additional details in the join table
  //       // For example, you might want to update timestamps
  //     });
  //   }
  // }

  // @Column({ type: 'boolean', default: false })
  // verified?: boolean;

  // @OneToMany(
  //   (type) => VerificationCode,
  //   (verificationCode) => verificationCode.user,
  //   { cascade: true, nullable: true },
  // )
  // verificationCodes?: VerificationCode[];
}
