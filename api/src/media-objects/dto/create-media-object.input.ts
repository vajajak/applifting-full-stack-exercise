import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MediaObjectType } from '../enums/media-object-type';

@InputType('CreateMediaObjectInput')
export class CreateMediaObjectInput {
  @IsNotEmpty()
  @IsEnum(MediaObjectType)
  @Field(() => MediaObjectType, { defaultValue: MediaObjectType.file })
  type!: MediaObjectType;

  @IsNotEmpty()
  @IsString()
  @Field()
  path!: string;
}
