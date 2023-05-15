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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Upload an asset to media object',
    description: `To upload an asset to media object, send a FormData encoded body with a parameter of "asset". This has to be an image format.`,
  })
  @ApiParam({ name: 'file' })
  @ApiResponse({
    status: 200,
    description: 'The asset has been successfuly uploaded to media object.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. You have to be logged-in and send a valid JWT token to upload data to media object.',
  })
  @ApiResponse({
    status: 400,
    description:
      'The provided file format is invalid. Uploaded asset has to be a valid image format.',
  })
  async uploadFile(@Res() response, @UploadedFile() file: Express.Multer.File) {
    const result = await this.mediaObjectService.createOne(file.path);
    response.json(result);
  }
}
