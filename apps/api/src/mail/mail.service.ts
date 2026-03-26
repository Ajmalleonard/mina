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
      secure: this.configService.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendDonationConfirmationEmail(
    to: string,
    name: string,
    amount: number,
    currency: string,
    items: { title: string; amount: number; quantity: number }[],
  ) {
    const itemRows = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #111111;">${item.title}</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #111111; text-align: right; white-space: nowrap;">${item.quantity} × ${currency}${item.amount.toFixed(2)}</td>
        </tr>`,
      )
      .join('');

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Donation Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 560px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 48px 32px; border-bottom: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 13px; font-weight: 600; color: #888888; letter-spacing: 0.1em; text-transform: uppercase;">Mina Foundation</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 48px;">
              <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #111111; letter-spacing: -0.02em;">Thank you, ${name.split(' ')[0]}.</h1>
              <p style="margin: 0 0 32px; font-size: 14px; color: #888888; line-height: 1.6;">Your donation has been received. Every contribution makes a real difference for the communities we serve.</p>

              <!-- Items Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <th style="text-align: left; padding-bottom: 8px; font-size: 11px; font-weight: 600; color: #aaaaaa; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #111111;">Donation</th>
                  <th style="text-align: right; padding-bottom: 8px; font-size: 11px; font-weight: 600; color: #aaaaaa; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #111111;">Amount</th>
                </tr>
                ${itemRows}
              </table>

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
                <tr>
                  <td style="padding-top: 16px; font-size: 14px; font-weight: 700; color: #111111; text-transform: uppercase; letter-spacing: 0.05em;">Total</td>
                  <td style="padding-top: 16px; font-size: 18px; font-weight: 700; color: #111111; text-align: right;">${currency}${amount.toFixed(2)}</td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; color: #888888; line-height: 1.6;">If you have any questions, simply reply to this email. We're always here to help.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 48px; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 12px; color: #aaaaaa; line-height: 1.5;">Mina Foundation · Non-profit organization · All donations are voluntary.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    try {
      await this.transporter.sendMail({
        from: `"Mina Foundation" <${this.configService.get<string>('SMTP_USER')}>`,
        to,
        subject: `Your donation to Mina Foundation — ${currency}${amount.toFixed(2)}`,
        html: htmlBody,
      });
      this.logger.log(`Confirmation email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
    }
  }

  // Legacy method kept for backward compatibility
  async sendDonationInitiatedEmail(
    to: string,
    name: string,
    amount: number,
    currency: string,
    activityTitle: string,
  ) {
    return this.sendDonationConfirmationEmail(to, name, amount, currency, [
      { title: activityTitle, amount, quantity: 1 },
    ]);
  }
}
