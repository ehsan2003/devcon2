import {IUser, IUserDoc} from "@models/User";
import {extractProps} from "@shared/utils/extractProps";

export const secureUserInfo = (user: IUserDoc) => extractProps(user.toObject() as IUser & { _id: string }, 'email', '_id', 'role');
