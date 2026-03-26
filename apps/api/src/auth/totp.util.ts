import { createHmac, randomBytes } from 'crypto';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Encode(buffer: Buffer) {
  let bits = 0;
  let value = 0;
  let output = '';

  for (const byte of buffer) {
    value = (value << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

function base32Decode(value: string) {
  const normalized = value.toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = 0;
  let buffer = 0;
  const output: number[] = [];

  for (const char of normalized) {
    const index = BASE32_ALPHABET.indexOf(char);
    if (index === -1) {
      continue;
    }

    buffer = (buffer << 5) | index;
    bits += 5;

    if (bits >= 8) {
      output.push((buffer >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(output);
}

function generateTotp(secret: string, counter: number, digits = 6) {
  const key = base32Decode(secret);
  const counterBuffer = Buffer.alloc(8);

  counterBuffer.writeUInt32BE(Math.floor(counter / 0x100000000), 0);
  counterBuffer.writeUInt32BE(counter % 0x100000000, 4);

  const hmac = createHmac('sha1', key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return (binary % 10 ** digits).toString().padStart(digits, '0');
}

export function generateTotpSecret(length = 32) {
  return base32Encode(randomBytes(length)).slice(0, length);
}

export function buildOtpAuthUrl({
  issuer,
  accountName,
  secret,
}: {
  issuer: string;
  accountName: string;
  secret: string;
}) {
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccountName = encodeURIComponent(accountName);

  return `otpauth://totp/${encodedIssuer}:${encodedAccountName}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

export function verifyTotpCode(secret: string, code: string, window = 1) {
  const sanitizedCode = code.replace(/\s+/g, '');
  const currentCounter = Math.floor(Date.now() / 1000 / 30);

  for (let offset = -window; offset <= window; offset += 1) {
    if (generateTotp(secret, currentCounter + offset) === sanitizedCode) {
      return true;
    }
  }

  return false;
}
