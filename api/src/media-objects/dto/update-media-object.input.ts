import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMediaObjectInput } from './create-media-object.input';

@InputType('UpdateMediaObjectInput')
export class UpdateMediaObjectInput extends PartialType(CreateMediaObjectInput) {}
