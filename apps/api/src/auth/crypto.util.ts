import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';

const ENCRYPTION_ENV_KEY = 'AUTH_ENCRYPTION_KEY';

function getEncryptionKey() {
  const secret = process.env[ENCRYPTION_ENV_KEY];

  if (!secret) {
    throw new Error(`${ENCRYPTION_ENV_KEY} is required to encrypt admin MFA secrets.`);
  }

  return createHash('sha256').update(secret).digest();
}

export function encryptSecret(value: string) {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString('base64url')}.${authTag.toString('base64url')}.${encrypted.toString('base64url')}`;
}

export function decryptSecret(value: string) {
  const key = getEncryptionKey();
  const [iv, authTag, encrypted] = value.split('.');

  if (!iv || !authTag || !encrypted) {
    throw new Error('Stored admin MFA secret is malformed.');
  }

  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(authTag, 'base64url'));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'base64url')),
    decipher.final(),
  ]).toString('utf8');
}
