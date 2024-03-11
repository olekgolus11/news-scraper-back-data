import { NextFunction, Request, Response } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
};

export default errorHandler;
