import { Field, ID, InputType } from '@nestjs/graphql';
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

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  avatarId?: string;
}
