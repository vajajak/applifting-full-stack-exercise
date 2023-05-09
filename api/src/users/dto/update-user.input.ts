import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType('UpdateUserInput')
export class UpdateUserInput extends CreateUserInput {
  @IsOptional()
  @Field({ nullable: true })
  password!: string;

  @IsOptional()
  @Field({ nullable: true })
  passwordConfirm: string;
}
