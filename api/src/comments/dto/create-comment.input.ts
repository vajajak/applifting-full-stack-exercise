import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType('CreateCommentInput')
export class CreateCommentInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  content!: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  articleId!: string;

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  parentId!: string;
}
