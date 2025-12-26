import type { Request, Response, NextFunction } from "express";
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
export declare const MessageController: {
    create(req: Request<{}, {}, CreateMessageDto>, res: Response, next: NextFunction): Promise<void>;
    findAll(_req: Request, res: Response, next: NextFunction): Promise<void>;
    findOne(req: Request<{
        id: string;
    }>, res: Response, next: NextFunction): Promise<void>;
    update(req: Request<{
        id: string;
    }, {}, UpdateMessageDto>, res: Response, next: NextFunction): Promise<void>;
    remove(req: Request<{
        id: string;
    }>, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=message.d.ts.map