import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  // Create a refresh token (implement persistent storage or DB mapping in future)
  createToken(payload: any) {
    const secret = this.config.get('REFRESH_TOKEN_SECRET') || this.config.get('JWT_SECRET');
    return this.jwtService.sign(payload, { secret, expiresIn: '7d' });
  }

  verifyToken(token: string) {
    try {
      const secret = this.config.get('REFRESH_TOKEN_SECRET') || this.config.get('JWT_SECRET');
      return this.jwtService.verify(token, { secret });
    } catch (e) {
      return null;
    }
  }

  // Placeholder for revocation logic
  revokeToken(_token: string) {
    // implement DB-backed revocation if required
    return true;
  }
}
