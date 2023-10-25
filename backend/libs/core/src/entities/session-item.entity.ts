import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SessionEntity } from './session.entity';

@Entity('session_items')
export class SessionItemEntity extends BaseEntity {
  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @Column()
  title: string;
  
  @Column()
  presenter: string;

  @Column({ name: 'session_id' })
  sessionId: string;

  @Column({ type: 'int', name: 'abstract_id' })
  abstractId: number;

  @ManyToOne(
    () => SessionEntity,
    (entity: SessionEntity) => entity.sessionItems,
  )
  @JoinColumn({ name: 'session_id', referencedColumnName: 'sessionId' })
  session: SessionEntity;
}
