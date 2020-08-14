import {mongo} from "mongoose";
import {ConflictError} from "@shared/errors";

export const handleUnique = (message: string) => (err: Error) => {
    if (err instanceof mongo.MongoError && err.code === 11000)
        throw new ConflictError(message);
    else
        throw err;
}