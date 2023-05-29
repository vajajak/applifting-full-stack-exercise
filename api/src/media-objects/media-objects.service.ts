import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaObject } from './entities/media-object.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class MediaObjectsService {
  constructor(
    @InjectRepository(MediaObject) private mediaObjectRepository: Repository<MediaObject>,
    private cloudinary: CloudinaryService
  ) {}

  async uploadToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async createOne({
    path,
    height,
    width,
    blurhash,
  }: {
    path: string;
    height: number;
    width: number;
    blurhash: string;
  }): Promise<MediaObject> {
    return await this.mediaObjectRepository.save({ path, height, width, blurhash });
  }
}
