/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MediaObjectsService } from './media-objects.service';
const sharp = require('sharp');

@ApiTags('Media Object')
@Controller('media-object')
export class MediaObjectController {
  constructor(
    private mediaObjectService: MediaObjectsService,
    private cloudinaryService: CloudinaryService
  ) {}

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
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
    this.cloudinaryService
      .uploadImage(file)
      .then(async (cloudinaryRes) => {
        const blurhash = (
          await sharp(file.buffer).raw().ensureAlpha().resize(32, 32, { fit: 'inside' }).toBuffer()
        ).toString('base64');
        const result = await this.mediaObjectService.createOne({
          path: cloudinaryRes.secure_url,
          width: cloudinaryRes.width,
          height: cloudinaryRes.height,
          blurhash: `data:image/png;base64,${blurhash}`,
        });
        response.json(result);
      })
      .catch(() => {
        response.json({ message: 'Provide a valid image' });
      });
  }
}
