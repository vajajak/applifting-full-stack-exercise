import { InputType, PartialType } from '@nestjs/graphql';
import { CreateArticleInput } from './create-article.input';

@InputType('UpdateArticleInput')
export class UpdateArticleInput extends PartialType(CreateArticleInput) {}
