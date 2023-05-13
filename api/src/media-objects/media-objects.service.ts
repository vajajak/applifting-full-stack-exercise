import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaObject } from './entities/media-object.entity';

@Injectable()
export class MediaObjectsService {
  constructor(
    @InjectRepository(MediaObject) private mediaObjectRepository: Repository<MediaObject>
  ) {}

  async createOne(path: string): Promise<MediaObject> {
    return await this.mediaObjectRepository.save({ path });
  }
}
