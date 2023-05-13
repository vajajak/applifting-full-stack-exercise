import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  featuredImageId?: string;
}
