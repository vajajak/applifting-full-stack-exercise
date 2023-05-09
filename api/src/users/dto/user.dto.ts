import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';

@ObjectType('User')
@KeySet(['id'])
@QueryOptions({
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1,
})
export class UserDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  firstName!: string;

  @FilterableField()
  lastName!: string;

  @FilterableField()
  email!: string;

  @FilterableField()
  createdAt!: Date;

  @FilterableField({ nullable: true })
  updatedAt?: Date;
}
