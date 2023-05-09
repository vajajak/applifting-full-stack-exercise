import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateArticleInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  perex!: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  content!: string;
}
