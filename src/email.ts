import nodemailer from "nodemailer";
import type { Transporter, SentMessageInfo } from "nodemailer";

export type EmailType = "bot" | "contact";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env["EMAIL_USER"] as string,
        pass: process.env["EMAIL_PASS"] as string,
      },
    });
  }

  private getTemplate(
    message: string,
    senderName: string,
    senderEmail: string,
    type: EmailType = "contact"
  ): string {
    if (type === "contact") {
      return `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
          <h2 style="color:#5c8a84;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${senderName}</p>
          <p><strong>Email:</strong> ${senderEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f3f4f6; padding:10px; border-radius:6px;">${message}</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
          <p style="font-size:12px; color:#999;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `;
    }

    return `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
        <h2 style="color:#5c8a84;">AI Bot Response</h2>
        <p><strong>User:</strong> ${senderName} (${senderEmail})</p>
        <p><strong>AI Message:</strong></p>
        <p style="background:#f3f4f6; padding:10px; border-radius:6px;">${message}</p>
        <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
        <p style="font-size:12px; color:#999;">
          Generated automatically by TechVibe AI Bot.
        </p>
      </div>
    `;
  }

  async sendMail(
    subject: string,
    message: string,
    senderName: string = "Anonymous",
    senderEmail: string = "",
    type: EmailType = "contact"
  ): Promise<SentMessageInfo> {
    try {
      const html = this.getTemplate(message, senderName, senderEmail, type);

      const info = await this.transporter.sendMail({
        from: `"TechVibe Bot" <${process.env["EMAIL_USER"]}>`,
        to: "eyobsmax@gmail.com",
        subject,
        html,
      });

      return info;
    } catch (error) {
      console.error("❌ Failed to send email:", (error as Error).message);
      throw error;
    }
  }
}

export default new EmailService();
