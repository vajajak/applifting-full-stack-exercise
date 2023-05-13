import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateMediaObjectInput } from './dto/create-media-object.input';
import { MediaObjectDTO } from './dto/media-object.dto';
import { UpdateMediaObjectInput } from './dto/update-media-object.input';
import { MediaObject } from './entities/media-object.entity';
import { MediaObjectRepository } from './media-object.repository';
import { MediaObjectsService } from './media-objects.service';
import { MediaObjectController } from './media-object.controller';

@Module({
  providers: [MediaObjectsService, MediaObjectRepository],
  imports: [
    TypeOrmModule.forFeature([MediaObject]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MediaObject])],
      resolvers: [
        {
          EntityClass: MediaObject,
          DTOClass: MediaObjectDTO,
          CreateDTOClass: CreateMediaObjectInput,
          UpdateDTOClass: UpdateMediaObjectInput,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
      ],
    }),
  ],
  exports: [MediaObjectsService],
  controllers: [MediaObjectController],
})
export class MediaObjectModule {}
