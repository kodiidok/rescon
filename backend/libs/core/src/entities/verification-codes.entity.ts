import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

/**
 * implement a task scheduler to automatically remove
 * the verification record from the database after 1 min
 */

@Entity('verification_codes')
export class VerificationCode extends BaseEntity {
  constructor(user: UserEntity, code: string) {
    super();
    // this.user = user;
    this.code = code;
  }

  @Column({ name: 'user_id' })
  userId!: string;

  // @ManyToOne(() => UserEntity, (user: UserEntity) => user.verificationCodes, {
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  // user: UserEntity;

  @Column()
  code: string;
}
