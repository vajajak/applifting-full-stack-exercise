import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { MediaObjectDTO } from 'src/media-objects/dto/media-object.dto';

@ObjectType('User')
@KeySet(['id'])
@QueryOptions({
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1,
})
@Relation('avatar', () => MediaObjectDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
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
