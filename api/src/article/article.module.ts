import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { ArticleDTO } from './dto/article.dto';
import { CreateArticleInput } from './dto/create-article.input';
import { Article } from './entities/article.entity';

@Module({
  providers: [ArticleRepository, ArticleService],
  imports: [
    TypeOrmModule.forFeature([Article]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Article])],
      resolvers: [
        {
          EntityClass: Article,
          DTOClass: ArticleDTO,
          CreateDTOClass: CreateArticleInput,
          create: { guards: [JWTAuthGuard] },
          update: { guards: [JWTAuthGuard] },
          delete: { guards: [JWTAuthGuard] },
        },
      ],
    }),
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
