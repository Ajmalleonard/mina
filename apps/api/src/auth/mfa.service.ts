import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class MfaService {
  generateSecret() {
    return speakeasy.generateSecret({
      name: 'Mina App',
      issuer: 'Mina',
    });
  }

  async generateQRCode(secret: any): Promise<string> {
    if (!secret || !secret.otpauth_url) throw new Error('Invalid secret');
    return qrcode.toDataURL(secret.otpauth_url);
  }

  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2,
    });
  }
}
