import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LowScoreException } from './exceptions/low-score-exception';
import yn from 'yn';

@Injectable()
export class RecaptchaService {
  constructor(private readonly httpService: HttpService) {}

  public async verify(recaptchaToken: string, remoteIp: string) {
    // Is recaptcha disabled?
    if (yn(process.env.DISABLE_RECAPTCHA)) {
      return;
    }

    // Verify request
    const recaptchaRes = await this.httpService.axiosRef
      .post(
        'https://www.google.com/recaptcha/api/siteverify',
        new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET,
          response: recaptchaToken,
          remoteip: remoteIp,
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .then((res) => res.data)
      .catch((error) => {
        Logger.error(error);
        throw new InternalServerErrorException({ message: 'auth.recaptcha.vertification_error' });
      });

    if (!recaptchaRes?.success || recaptchaRes?.score < 0.8) {
      throw new LowScoreException('auth.recaptcha.low_score');
    }
  }
}
