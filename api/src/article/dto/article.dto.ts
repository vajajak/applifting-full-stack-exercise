import { ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField,
  IDField,
  KeySet,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { UserDTO } from 'src/users/dto/user.dto';
import { Article } from '../entities/article.entity';

@ObjectType('Article')
@BeforeCreateOne((input: CreateOneInputType<Article>, context) => {
  input.input.userId = context.req.user.id;
  return input;
})
@KeySet(['id'])
@QueryOptions({
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1,
})
@Relation('user', () => UserDTO, { nullable: true })
export class ArticleDTO {
  @IDField(() => ID, { description: 'An unique UUID of an article' })
  id!: string;

  @FilterableField(() => String)
  title!: string;

  @FilterableField(() => String)
  perex!: string;

  @FilterableField(() => String)
  content!: string;

  @FilterableField(() => Date)
  createdAt!: Date;

  @FilterableField(() => Date, { nullable: true })
  updatedAt?: Date;
}
