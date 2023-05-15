import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Log-in a user using an email-password pair (local login)',
    description: `Log-in a user using an email-password pair.
    The data has to be sent inside a body and encoded as FormData.
    If successfull, a JWT token is generated and sent inside a set-cookie header.
    For security purposes, this header has httpOnly and secure attributes set,
    and is not meant to be interacted in any way inside client javascript.`,
  })
  @ApiParam({ name: 'email' })
  @ApiParam({ name: 'password' })
  @ApiResponse({
    status: 200,
    description:
      'The user has been successfully logged-in. Access token has been sent inside a set-cookie header.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. See error message to understand why this is the case.',
  })
  async login(@Request() req, @Res() res) {
    const user = req.user;
    const { accessToken, payload } = await this.authService.login(req.user);

    res.cookie('accessToken', accessToken, {
      expires: req.user.remember ? new Date(payload.exp * 1000) : false,
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });

    return res.json(user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('user')
  @ApiOperation({
    summary: 'Retrieve a user object',
    description:
      'Retrieves a user object. No API params are needed, just an accessToken cookie, eg: Cookie:accessToken=yourToken',
  })
  @ApiResponse({
    status: 200,
    description:
      'User has been found successfully and user object has been returned as a part of the response body.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. See error message to understand why this is the case.',
  })
  async retrieve(@Request() req) {
    const user = req.user;
    return { user };
  }

  @Get('logout')
  @ApiOperation({
    summary: 'Log-out a user',
    description: `Logs out a user.
    As JWT is stateless, the only thing this does is it invalidates the locally stored cookie containing the token.
    Because of this limitation, this API route always returns success (200) regardless of whether the user was of was not signed in.`,
  })
  @ApiResponse({
    status: 200,
    description:
      'Always will be 200 (success), this is due to the limitation of this technical implementation. Reference above.',
  })
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('accessToken', '', { expires: new Date(null) });
  }
}
