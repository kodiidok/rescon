import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SessionItemEntity } from './session-item.entity';

@Entity('abstracts')
export class AbstractEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  presenter: string;

  @Column({ type: 'int', name: 'abstract_id', unique: true })
  abstractId: number;

  @OneToOne(
    () => SessionItemEntity,
    (entity: SessionItemEntity) => entity.abstract,
  )
  sessionItem: SessionItemEntity;
}
