import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { MediaObjectType } from '../enums/media-object-type';

@ObjectType('MediaObject')
@KeySet(['id'])
@QueryOptions({
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1,
})
export class MediaObjectDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField(() => MediaObjectType)
  type!: MediaObjectType;

  @FilterableField()
  path!: string;

  @FilterableField()
  height!: number;

  @FilterableField()
  width!: number;

  @FilterableField()
  blurhash!: string;

  @FilterableField()
  createdAt!: Date;

  @FilterableField({ nullable: true })
  updatedAt?: Date;
}
