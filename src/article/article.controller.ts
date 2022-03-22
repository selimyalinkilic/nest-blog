import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { User } from 'src/auth/user.decoration';
import { UserEntity } from 'src/entities/user.entity';
import {
  CreateArticleDTO,
  FindFeedQuery,
  UpdateArticleDTO,
} from 'src/models/article.model';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async findAll() {
    const articles = await this.articleService.findAll();
    return { articles, articlesCount: articles.length };
  }

  @Get('/feed')
  async findFeed(@Query() query: FindFeedQuery) {
    const articles = await this.articleService.findFeed(query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const article = await this.articleService.findBySlug(slug);
    return { article };
  }

  @Post('')
  @UseGuards(AuthGuard())
  async createArticle(
    @User() user: UserEntity,
    @Body(ValidationPipe) data: CreateArticleDTO,
  ) {
    const article = await this.articleService.createArticle(user, data);
    return { article };
  }

  @Put('/:slug')
  @UseGuards(AuthGuard())
  async updateArticle(
    @Param('slug') slug: string,
    @Body(ValidationPipe) data: UpdateArticleDTO,
  ) {
    const article = await this.articleService.updateArticle(slug, data);
    return { article };
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param('slug') slug: string) {
    const article = await this.articleService.deleteArticle(slug);
    return article;
  }
}
