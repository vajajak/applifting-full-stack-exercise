import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentsModule } from 'src/comments/comments.module';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { ArticleDTO } from './dto/article.dto';
import { CreateArticleInput } from './dto/create-article.input';
import { Article } from './entities/article.entity';
import { ArticleResolver } from './article.resolver';

@Module({
  providers: [ArticleRepository, ArticleService, ArticleResolver],
  imports: [
    CommentsModule,
    TypeOrmModule.forFeature([Article]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Article]), CommentsModule],
      resolvers: [
        {
          EntityClass: Article,
          DTOClass: ArticleDTO,
          CreateDTOClass: CreateArticleInput,
          create: { guards: [JWTAuthGuard], many: { disabled: true } },
          update: { guards: [JWTAuthGuard], many: { disabled: true } },
          delete: { guards: [JWTAuthGuard], many: { disabled: true } },
        },
      ],
    }),
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
