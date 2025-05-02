// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: `"HR Department" <${this.configService.get('GMAIL_USER')}>`,
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`📧 Mock email sent to ${to}`);
  }
}
