import { Inject } from '@nestjs/common';
import { Parent, Resolver } from '@nestjs/graphql';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { ReadResolver } from '@ptc-org/nestjs-query-graphql';
import { CommentsService } from 'src/comments/comments.service';
import { ArticleDTO } from './dto/article.dto';
import { Article } from './entities/article.entity';
import { ResolverField } from '@ptc-org/nestjs-query-graphql/src/decorators';

@Resolver(() => ArticleDTO)
export class ArticleResolver extends ReadResolver(ArticleDTO) {
  constructor(
    @InjectQueryService(Article) readonly service: QueryService<ArticleDTO>,
    @Inject(CommentsService) private commentsService: CommentsService
  ) {
    super(service);
  }

  @ResolverField('commentCount', () => Number, { nullable: false, defaultValue: 0 })
  async getCommentsCount(@Parent() articleDto: ArticleDTO) {
    return (await this.commentsService.count({ where: { articleId: articleDto.id } })) || 0;
  }
}
