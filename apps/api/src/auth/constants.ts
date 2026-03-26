import { ConfigService } from '@nestjs/config';

const LOCAL_DEV_JWT_SECRET = 'mina-local-dev-jwt-secret-change-me';

export function getJwtSecret(configService?: ConfigService) {
  const secret = configService?.get<string>('JWT_SECRET') || process.env.JWT_SECRET;

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be configured in production.');
  }

  return LOCAL_DEV_JWT_SECRET;
}
