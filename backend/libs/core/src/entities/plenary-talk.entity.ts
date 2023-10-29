import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SessionEntity } from './session.entity';

@Entity('plenary_talks')
export class PlenaryTalkEntity extends BaseEntity {
  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @Column()
  presenter: string;

  @Column()
  location: string;

  @Column({ name: 'session_id', nullable: true })
  sessionId: string;

  @ManyToOne(
    () => SessionEntity,
    (entity: SessionEntity) => entity.sessionItems,
    { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'session_id', referencedColumnName: 'sessionId' })
  session: SessionEntity;
}
