import { ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ArticleDTO } from 'src/article/dto/article.dto';
import { UserDTO } from 'src/users/dto/user.dto';
import { Comment } from '../entities/comment.entity';

@ObjectType('Comment')
@BeforeCreateOne((input: CreateOneInputType<Comment>, context) => {
  input.input.userId = context.req.user.id;
  return input;
})
@KeySet(['id'])
@QueryOptions({
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1,
})
@Relation('user', () => UserDTO, { nullable: false, disableRemove: true, disableUpdate: true })
@Relation('parent', () => CommentDTO, { nullable: true, disableRemove: true, disableUpdate: true })
@FilterableRelation('article', () => ArticleDTO, {
  nullable: false,
  disableRemove: true,
  disableUpdate: true,
})
export class CommentDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField(() => String)
  content!: string;

  @FilterableField(() => String)
  articleId!: string;

  @FilterableField(() => Date)
  createdAt!: Date;
}
