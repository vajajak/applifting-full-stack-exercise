import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { RecaptchaService } from '../recaptcha/recaptcha.service';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly recaptchaService: RecaptchaService
  ) {}

  async validateUser(
    username: string,
    password: string,
    remember: boolean,
    recaptchaToken: string,
    ip: string
  ): Promise<any> {
    /**
     * Recaptcha verification
     */

    // try {
    //   await this.recaptchaService.verify(recaptchaToken, ip);
    // } catch (error) {
    //   throw new UnauthorizedException({ message: 'auth.recaptcha.low_score' });
    // }

    /**
     * User verification
     */
    const user = await this.usersService.findOne({ where: { email: username } });

    if (!user?.password) {
      throw new UnauthorizedException({ message: 'auth.wrong_user' });
    }

    const isPasswordCorrect = compareSync(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException({ message: 'auth.wrong_password' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return { ...result, remember };
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: user.remember ? '30d' : '1d' });
    const decodedToken = this.jwtService.decode(accessToken);

    return {
      accessToken,
      payload: typeof decodedToken === 'string' ? { decodedToken } : decodedToken,
    };
  }

  async retrieveUser(payload: any): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.usersService.findOne({
      where: { id: payload.sub, email: payload.username },
    });

    if (!result) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return result;
  }
}
