import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('abstracts')
export class AbstractEntity extends BaseEntity {
  @Column()
  time: string;

  @Column()
  title: string;

  @Column()
  presenter: string;

  @Column()
  abstractId: number;

  @Column()
  day: string;

  @Column()
  sessionId: number;

  @Column('simple-array')
  sessionChairs: string[];

  @Column()
  category: string;
}
