import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './public.decorator';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res) {
    const user = req.user;
    const { accessToken, payload } = await this.authService.login(req.user);

    res.cookie('accessToken', accessToken, {
      expires: req.user.remember ? new Date(payload.exp * 1000) : false,
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });

    return res.json({
      accessToken: accessToken,
      user,
    });
  }

  @UseGuards(JWTAuthGuard)
  @Get('user')
  async retrieve(@Request() req) {
    const user = req.user;
    return { user };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('accessToken', '', { expires: new Date(null) });
  }
}
