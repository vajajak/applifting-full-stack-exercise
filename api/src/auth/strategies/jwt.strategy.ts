import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWTFromCookie]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      //test
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException({ message: 'auth.payload_wrong_format' });
    }

    return await this.authService.retrieveUser(payload);
  }

  private static extractJWTFromCookie(req): string | null {
    if (req.cookies?.accessToken?.length > 0) {
      return req.cookies.accessToken as string;
    }

    return null;
  }
}
