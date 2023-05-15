import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VotesModule } from 'src/votes/votes.module';
import { CommentRepository } from './comment.repository';
import { CommentsService } from './comments.service';
import { CommentDTO } from './dto/comment.dto';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';
import { CommentResolver } from './comment.resolver';

@Module({
  providers: [CommentRepository, CommentsService, CommentResolver],
  imports: [
    VotesModule,
    TypeOrmModule.forFeature([Comment]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Comment]), VotesModule],
      resolvers: [
        {
          EntityClass: Comment,
          DTOClass: CommentDTO,
          CreateDTOClass: CreateCommentInput,
          create: {
            one: { guards: [JWTAuthGuard], enableSubscriptions: true },
            many: { disabled: true },
          },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
      ],
    }),
  ],
  exports: [CommentsService],
})
@Module({})
export class CommentsModule {}
