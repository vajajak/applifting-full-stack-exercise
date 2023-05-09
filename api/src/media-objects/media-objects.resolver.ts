import { Resolver } from '@nestjs/graphql';
import { MediaObjectDTO } from './dto/media-object.dto';
import { MediaObjectsService } from './media-objects.service';

@Resolver(() => MediaObjectDTO)
export class MediaObjectsResolver {
  constructor(private readonly mediaObjectsService: MediaObjectsService) {}
}
