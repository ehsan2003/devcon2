import {IUserDoc} from "@models/User";
import bcrypt from 'bcrypt';

export const checkPassword = (user: IUserDoc, password: string) => bcrypt.compare(password, user.password);