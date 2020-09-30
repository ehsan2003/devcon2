import {Strategy} from 'passport-jwt';
import passport from 'passport';
import configurations from "@conf/configurations";
import User from "@models/User";
import {NotFoundError} from "@shared/errors";
import {Strategy as AnonymousStrategy} from 'passport-anonymous';
import {Codes} from "../@types";

export default (passportInstance: passport.PassportStatic) => {
    passportInstance.use(new Strategy(configurations.passportStrategy, (jwtPayload, done) => {
        User.findOne({_id: jwtPayload._id}).then(user => {
            if (user)
                done(null, user);
            else
                done(new NotFoundError(Codes.AUTHORIZATION_USER_NOT_FOUND, 'user notfound'), false);
        }).catch((err) => done(err, false));
    }));
    passport.use(new AnonymousStrategy());
};