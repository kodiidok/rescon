import { Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import { BaseEntity } from './base.entity';
import { SessionEntity } from './session.entity';

@Entity('panal_discussions')
export class PanalDiscussionEntity extends BaseEntity {
  @ManyToOne(
    () => SessionEntity,
    (entity: SessionEntity) => entity.sessionItems,
    { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'session_id', referencedColumnName: 'sessionId' })
  session: SessionEntity;

  @Column({ name: 'session_id', nullable: true })
  sessionId: string;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;
}