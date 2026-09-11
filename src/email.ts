import nodemailer from "nodemailer";
import type { Transporter, SentMessageInfo } from "nodemailer";
import { optional } from "./env.js";

export type EmailType = "bot" | "contact";

/**
 * Escapes text before it is dropped into the HTML template.
 *
 * The body of these emails is whatever a stranger typed into the contact form,
 * so interpolating it raw let a submission inject markup — at best mangling
 * the mail, at worst planting a link that reads as if the site sent it.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

  /** True when credentials are present, so callers can skip sending quietly. */
  get isConfigured(): boolean {
    return Boolean(process.env["EMAIL_USER"] && process.env["EMAIL_PASS"]);
  }

  private getTemplate(
    message: string,
    senderName: string,
    senderEmail: string,
    type: EmailType = "contact"
  ): string {
    const name = escapeHtml(senderName);
    const email = escapeHtml(senderEmail);
    // Newlines survive as line breaks; the form is a textarea, so a message
    // written in paragraphs arrived as one run-on block without this.
    const body = escapeHtml(message).replace(/\n/g, "<br />");

    if (type === "contact") {
      return `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
          <h2 style="color:#5c8a84;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f3f4f6; padding:10px; border-radius:6px;">${body}</p>
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
        <p><strong>User:</strong> ${name} (${email})</p>
        <p><strong>AI Message:</strong></p>
        <p style="background:#f3f4f6; padding:10px; border-radius:6px;">${body}</p>
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
    const html = this.getTemplate(message, senderName, senderEmail, type);

    return this.transporter.sendMail({
      from: `"TechVibe Bot" <${process.env["EMAIL_USER"]}>`,
      to: optional("CONTACT_EMAIL", "eyobsmax@gmail.com"),
      subject,
      html,
      /*
       * Not `from` — Gmail rewrites that to the authenticated account anyway,
       * and forging it trips SPF. Reply-To is what makes hitting reply in the
       * inbox actually reach the visitor.
       */
      ...(senderEmail ? { replyTo: senderEmail } : {}),
    });
  }
}

export default new EmailService();
