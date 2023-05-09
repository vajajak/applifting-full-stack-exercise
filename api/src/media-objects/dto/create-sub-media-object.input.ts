import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateSubMediaObjectInput {
  @IsOptional()
  @IsString()
  @Field(() => ID)
  id?: string;
}
