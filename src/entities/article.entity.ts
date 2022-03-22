import { classToPlain } from 'class-transformer';
import * as slugify from 'slug';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { UserEntity } from './user.entity';

@Entity('articles')
export class ArticleEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column()
  body: string;

  @Column({ default: null, nullable: true })
  thumbnail: string;

  @ManyToOne((type) => UserEntity, (user) => user.articles)
  author: UserEntity;

  @Column('simple-array')
  tags: string[];

  @Column({ unique: true })
  slug: string;

  toJSON() {
    return classToPlain(this);
  }
}
