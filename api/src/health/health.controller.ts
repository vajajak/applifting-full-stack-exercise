import { Controller, Get, Res } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck(@Res() response) {
    const result = {
      success: true,
      message: 'healthy',
    };
    response.json(result);
  }
}
