import { NextFunction, Request, Response } from "express";
import getDbService from "../utils/getDbService";
import UserData from "../interfaces/UserData";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dbService = getDbService();
        const userData = req.body as UserData;
        console.log("userData", userData);

        await dbService.addUser(userData);

        res.status(StatusCodes.CREATED).send("User registered");
    } catch (error: any) {
        next(error);
    }
};

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dbService = getDbService();
        const userData = req.body as UserData;
        console.log("userData", userData);

        const userId = await dbService.authenticateUser(userData);
        const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        res.status(StatusCodes.OK).cookie("token", token).send("User authenticated");
    } catch (error: any) {
        next(error);
    }
};
