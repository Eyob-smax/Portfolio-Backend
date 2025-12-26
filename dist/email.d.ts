import type { SentMessageInfo } from "nodemailer";
export type EmailType = "bot" | "contact";
declare class EmailService {
    private transporter;
    constructor();
    private getTemplate;
    sendMail(subject: string, message: string, senderName?: string, senderEmail?: string, type?: EmailType): Promise<SentMessageInfo>;
}
declare const _default: EmailService;
export default _default;
