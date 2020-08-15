import {IUserDoc} from "@models/User";
import {extractProps} from "@shared/utils/extractProps";

export const secureUserInfo=(user:IUserDoc)=>extractProps(user.toObject(),'email','username','_id','role')
