import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MediaObject } from './entities/media-object.entity';
import { MediaObjectRepository } from './media-object.repository';

@Injectable()
export class MediaObjectsService extends TypeOrmCrudService<MediaObject> {
  constructor(
    @InjectRepository(MediaObject) repo,
    private mediaObjectRepository: MediaObjectRepository
  ) {
    super(repo);
  }
}
