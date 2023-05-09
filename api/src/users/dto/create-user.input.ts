import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

@InputType('CreateUserInput')
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName!: string;

  // @Unique({ message: 'user_not_unique' })
  // @Validate(UserUnique, { message: 'user_not_unique' })
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email!: string;

  @IsString()
  @Matches('^(?=.*[A-Z])(?=.*[0-9]).{12,}$')
  @Field()
  password!: string;

  @IsOptional()
  @IsString()
  @Field()
  passwordConfirm: string;
}
