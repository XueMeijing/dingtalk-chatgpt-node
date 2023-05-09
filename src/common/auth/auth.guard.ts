import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { APP_SECRET } from '@/app.config';

const {
  createHmac,
} = require('node:crypto');

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    delete request.headers.connection;
    const timestamp = request.headers['timestamp'] || undefined;
    const sign = request.headers['sign'] || undefined;

    if (!sign || !timestamp) {
      throw new UnauthorizedException('请求失败，钉钉签名不存在');
    }

    if (sign !== this.checkSignature(timestamp)) {
      throw new UnauthorizedException('请求失败，钉钉签名不正确');
    }

    return true
  }

  private checkSignature (timestamp) {
    const appSecret = APP_SECRET;
    const appSecretEnc = new TextEncoder().encode(appSecret);
    const stringToSign = `${timestamp}\n${appSecret}`;
    const stringToSignEnc = new TextEncoder().encode(stringToSign);
    const hmacCode = createHmac('sha256', appSecretEnc).update(stringToSignEnc).digest();
    const sign = Buffer.from(hmacCode).toString('base64')
    return sign
  }
}