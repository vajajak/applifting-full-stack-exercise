import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MediaObjectsService } from './media-objects.service';

@ApiTags('Media Object')
@Controller('media-object')
export class MediaObjectController {
  constructor(private mediaObjectService: MediaObjectsService) {}

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets',
        filename: (req, file, cb) => {
          if (!file.mimetype.includes('image')) {
            return cb(new BadRequestException('Provide a valid image'), null);
          }

          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          const filename = `${randomUUID()}-${Date.now()}.${fileExt}`;

          cb(null, filename);
        },
      }),
    })
  )
  @Post('upload')
  async uploadFile(@Res() response, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const result = await this.mediaObjectService.createOne(file.path);
    console.log(result);
    response.json(result);
    // return JSON.stringify(result);
  }
}
