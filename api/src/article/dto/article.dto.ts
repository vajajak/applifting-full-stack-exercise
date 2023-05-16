import { ID, ObjectType } from '@nestjs/graphql';
import {
  Authorize,
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  KeySet,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { MediaObjectDTO } from 'src/media-objects/dto/media-object.dto';
import { UserDTO } from 'src/users/dto/user.dto';
import { Article } from '../entities/article.entity';
import { CommentDTO } from 'src/comments/dto/comment.dto';
import slugify from 'slugify';

@ObjectType('Article')
@BeforeCreateOne((input: CreateOneInputType<Article>, context) => {
  input.input.userId = context.req.user.id;
  input.input.slug = slugify(input.input.title, { lower: true, strict: true, locale: 'cs' });
  return input;
})
@Authorize({
  authorize: (userContext, authContext) => {
    if (authContext.readonly) {
      return {};
    }
    return { userId: { eq: userContext.req.user.id } };
  },
})
@KeySet(['id'])
@QueryOptions({
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1,
})
@Relation('user', () => UserDTO, { nullable: false, disableRemove: true, disableUpdate: true })
@Relation('featuredImage', () => MediaObjectDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
})
@FilterableUnPagedRelation('comments', () => CommentDTO, {
  disableRemove: true,
  disableUpdate: true,
})
export class ArticleDTO {
  @IDField(() => ID, { description: 'An unique UUID of an article' })
  id!: string;

  @FilterableField(() => String)
  title!: string;

  @FilterableField(() => String)
  slug!: string;

  @FilterableField(() => String)
  perex!: string;

  @FilterableField(() => String)
  content!: string;

  @FilterableField(() => Number, { nullable: false, defaultValue: 0 })
  commentCount!: number;

  @FilterableField(() => ID)
  userId!: string;

  @FilterableField(() => Date)
  createdAt!: Date;

  @FilterableField(() => Date, { nullable: true })
  updatedAt?: Date;
}
