import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  private s3Client: S3Client | null = null;

  async uploadImage(file: any) {
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image uploads are supported.');
    }

    const bucket = this.getRequiredEnv('AWS_S3_BUCKET');
    const region = this.getRequiredEnv('AWS_REGION');
    const prefix = (process.env.AWS_S3_PREFIX || 'mina/promotions').replace(/^\/+|\/+$/g, '');
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
    const key = `${prefix}/${Date.now()}-${sanitizedName}`;

    await this.getClient().send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );

    const baseUrl = process.env.AWS_S3_PUBLIC_URL_BASE?.replace(/\/+$/g, '');
    const url = baseUrl
      ? `${baseUrl}/${key}`
      : `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return {
      key,
      url,
    };
  }

  private getClient() {
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        region: this.getRequiredEnv('AWS_REGION'),
        credentials: {
          accessKeyId: this.getRequiredEnv('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.getRequiredEnv('AWS_SECRET_ACCESS_KEY'),
        },
      });
    }

    return this.s3Client;
  }

  private getRequiredEnv(key: string) {
    const value = process.env[key];

    if (!value) {
      throw new BadRequestException(`${key} is missing from the API environment.`);
    }

    return value;
  }
}
