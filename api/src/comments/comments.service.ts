import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CommentRepository } from './comment.repository';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService extends TypeOrmCrudService<Comment> {
  constructor(@InjectRepository(Comment) repo, private commentRespository: CommentRepository) {
    super(repo);
  }
}
