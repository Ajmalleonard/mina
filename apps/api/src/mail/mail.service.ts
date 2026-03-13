import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<string>('SMTP_SECURE') === 'true', // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendDonationInitiatedEmail(
    to: string,
    name: string,
    amount: number,
    currency: string,
    activityTitle: string,
  ) {
    const htmlBody = `
      <div style="font-family: sans-serif; color: #111; line-height: 1.6;">
        <h2 style="color: #111;">Thank you for your generosity, ${name}!</h2>
        <p>We have successfully received your request to donate <strong>${amount} ${currency}</strong> towards <strong>${activityTitle}</strong>.</p>
        <p>Please complete your payment on the redirected page. Your empathy transforms lives across Tanzania.</p>
        <p>If you have any questions, feel free to contact us.</p>
        <br/>
        <p><strong>The Mina Foundation Team</strong></p>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Mina Foundation" <${this.configService.get<string>('SMTP_USER')}>`,
        to,
        subject: `Your Donation to Mina Foundation - ${activityTitle}`,
        html: htmlBody,
      });
      this.logger.log(`Initiation email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      // We don't throw here to ensure the payment flow is not blocked if email fails
    }
  }
}
