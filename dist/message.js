import emailService from "./email.js";
import { prisma } from "./database.js";
export const MessageController = {
    async create(req, res, next) {
        try {
            const { email, message, subject, name } = req.body;
            if (!message) {
                res.status(400).json({
                    message: "Name and message are required",
                });
                return;
            }
            const createdMessage = await prisma.message.create({
                data: {
                    email: email ?? "No email",
                    message,
                    subject: subject ?? "New Contact Form Submission",
                    name: name ?? "Anonymous",
                },
            });
            await emailService.sendMail(subject ?? "New Contact Form Submission", message, name, email, "contact");
            res.status(201).json(createdMessage);
        }
        catch (error) {
            next(error);
        }
    },
    async findAll(_req, res, next) {
        try {
            const messages = await prisma.message.findMany({
                orderBy: { id: "desc" },
            });
            res.json(messages);
        }
        catch (error) {
            next(error);
        }
    },
    async findOne(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    },
    async remove(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=message.js.map