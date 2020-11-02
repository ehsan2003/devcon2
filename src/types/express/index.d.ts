import {IUserDoc} from "@models/User";

declare global {
    namespace Express {
        // tslint:disable-next-line:no-empty-interface
        export interface User extends IUserDoc {
        }

        export interface Request {
            data: any;
        }
    }
}