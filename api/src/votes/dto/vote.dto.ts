import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Vote')
export class VoteDTO {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}
