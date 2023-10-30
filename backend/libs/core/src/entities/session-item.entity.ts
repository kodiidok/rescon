import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SessionEntity } from './session.entity';

@Entity('session_items')
export class SessionItemEntity extends BaseEntity {
  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  presenter: string;

  @Column({ name: 'session_id', nullable: true })
  sessionId: string;

  @Column({ type: 'int', name: 'abstract_id', nullable: true })
  abstractId: number;

  @Column({ nullable: true })
  via: string;

  @ManyToOne(
    () => SessionEntity,
    (entity: SessionEntity) => entity.sessionItems,
    { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'session_id', referencedColumnName: 'sessionId' })
  session: SessionEntity;
}
