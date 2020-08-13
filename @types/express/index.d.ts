import {IUserDoc} from "@models/User";
declare global{
    namespace Express {
        export interface User extends IUserDoc{}
        export interface Request{
            data:any
        }
    }
}