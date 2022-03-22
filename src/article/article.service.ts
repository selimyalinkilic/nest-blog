import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  CreateArticleDTO,
  FindFeedQuery,
  UpdateArticleDTO,
} from 'src/models/article.model';
import string_to_slug from 'src/utils/generateSlug';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
  ) {}

  findAll() {
    return this.articleRepo.find();
  }

  async findFeed(query: FindFeedQuery) {
    return await this.articleRepo.findAndCount({
      skip: query.offset,
      take: query.limit,
    });
  }

  findBySlug(slug: string) {
    return this.articleRepo.findOne({ where: { slug } });
  }

  async createArticle(user: UserEntity, data: CreateArticleDTO) {
    try {
      const article = this.articleRepo.create(data);
      article.author = user;
      article.slug = string_to_slug(article.title);
      const res = await article.save();
      return res;
    } catch (error) {
      if (error.code === '23505')
        throw new BadRequestException('This article has already been exist');

      throw new InternalServerErrorException();
    }
  }

  async updateArticle(slug: string, data: UpdateArticleDTO) {
    const article = await this.findBySlug(slug);
    if (!article) throw new NotFoundException('This article is not exist');
    await this.articleRepo.update({ slug }, data);
    const result = await this.findBySlug(slug);
    return result;
  }

  async deleteArticle(slug: string) {
    const article = await this.findBySlug(slug);
    if (!article) throw new NotFoundException('This article is not exist');
    await this.articleRepo.remove(article);
    return {
      result: {
        success: 200,
        message: `${slug} was successfully deleted`,
      },
    };
  }
}
