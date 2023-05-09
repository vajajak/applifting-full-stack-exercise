import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MediaObject } from './entities/media-object.entity';

@Injectable()
export class MediaObjectRepository extends Repository<MediaObject> {
  constructor(private dataSource: DataSource) {
    super(MediaObject, dataSource.createEntityManager());
  }
}
