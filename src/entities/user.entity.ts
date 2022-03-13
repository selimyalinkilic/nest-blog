import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import * as bcrypt from 'bcryptjs';
import { ArticleEntity } from './article.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
