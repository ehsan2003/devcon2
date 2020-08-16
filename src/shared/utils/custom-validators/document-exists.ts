import {Document, FilterQuery, Model} from "mongoose";

export const documentExists = <T extends Document>(model: Model<T>, query: FilterQuery<T>) =>
    model.exists(query);
