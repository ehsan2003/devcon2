import {IUserDoc} from "@models/User";
import keys from "@conf/keys";
import configurations from "@conf/configurations";
import jwt from 'jsonwebtoken';
import {extractProps} from "@shared/utils";

export const signJwt = (user: IUserDoc) => {
    const token = jwt.sign(extractProps(user.toObject(),'email','_id'), keys.secretOrKey, configurations.jwtTokenSingOptions);
    return `Bearer ${token}`;
};