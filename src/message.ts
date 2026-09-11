import type { Request, Response, NextFunction } from "express";
import emailService from "./email.js";
import { prisma } from "./database.js";
export interface CreateMessageDto {
  email?: string;
  name?: string;
  subject?: string;
  message: string;
}

export interface UpdateMessageDto {
  email?: string;
  name?: string;
  subject?: string;
  message?: string;
}
/** Generous for a contact form, small enough to keep junk out of the table. */
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MessageController = {
  async create(
    req: Request<{}, {}, CreateMessageDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const name = req.body.name?.trim();
      const email = req.body.email?.trim();
      const subject = req.body.subject?.trim();
      const message = req.body.message?.trim();

      if (!message) {
        // The old copy said "Name and message are required" while only checking
        // the message, which sent people hunting for a field that was fine.
        res.status(400).json({ message: "Message is required" });
        return;
      }

      if (message.length > MAX_MESSAGE_LENGTH) {
        res.status(400).json({
          message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
        });
        return;
      }

      if (email && !EMAIL_PATTERN.test(email)) {
        res.status(400).json({ message: "Email address is not valid" });
        return;
      }

      const createdMessage = await prisma.message.create({
        data: {
          email: email ?? "No email",
          message,
          subject: subject || "New Contact Form Submission",
          name: name || "Anonymous",
        },
      });

      /*
       * Best effort, and deliberately after the write.
       *
       * The notification used to be awaited inside the same try, so a Gmail
       * hiccup answered a perfectly good submission with a 500 — the visitor
       * saw "something went wrong" and sent it again, and the table collected
       * duplicates of a message that had saved correctly every time.
       */
      if (emailService.isConfigured) {
        try {
          await emailService.sendMail(
            subject || "New Contact Form Submission",
            message,
            name,
            email,
            "contact"
          );
        } catch (error) {
          console.error(
            "Contact saved but notification email failed:",
            (error as Error).message
          );
        }
      }

      res.status(201).json(createdMessage);
    } catch (error) {
      next(error);
    }
  },

  async findAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const messages = await prisma.message.findMany({
        orderBy: { id: "desc" },
      });

      res.json(messages);
    } catch (error) {
      next(error);
    }
  },

  async findOne(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);

      const message = await prisma.message.findUnique({
        where: { id },
      });

      if (!message) {
        res.status(404).json({
          message: `Message with id ${id} not found`,
        });
        return;
      }

      res.json(message);
    } catch (error) {
      next(error);
    }
  },

  async update(
    req: Request<{ id: string }, {}, UpdateMessageDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);

      const existingMessage = await prisma.message.findUnique({
        where: { id },
      });

      if (!existingMessage) {
        res.status(404).json({
          message: `Message with id ${id} not found`,
        });
        return;
      }

      const updatedMessage = await prisma.message.update({
        where: { id },
        data: req.body,
      });

      res.json(updatedMessage);
    } catch (error) {
      next(error);
    }
  },

  async remove(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);

      const existingMessage = await prisma.message.findUnique({
        where: { id },
      });

      if (!existingMessage) {
        res.status(404).json({
          message: `Message with id ${id} not found`,
        });
        return;
      }

      await prisma.message.delete({
        where: { id },
      });

      res.json({
        message: `Message with id ${id} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
};
