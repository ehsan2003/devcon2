import {ExtractJwt, StrategyOptions} from 'passport-jwt';
import keys from "@conf/keys";
import multer, {Options} from 'multer';
import {ResizeOptions} from "sharp";

interface Sizes {
    thumbnail: 'thumbnail';
    large: 'large';
    medium: 'medium';
    full: 'full';
}

export interface IConfigurations {
    jwtTokenSingOptions: { expiresIn: number };
    passportStrategy: StrategyOptions;
    passwordHash: { saltRounds: number };
    verificationTokens: {
        defaultByteLength: number
        encoding: BufferEncoding
    };
    tags: { search: { limitDefault: number } };
    categories: { search: { limit: number } };
    posts: {
        search: { limit: number }, image: {
            uploadLimit: Options['limits'], allowedMimeTypes: string[], sizes: { names: (keyof Sizes)[], info: { [p in keyof Sizes]: ResizeOptions } }

        }
    };

}

const configurations: IConfigurations = {
    posts: {
        search: {limit: 100}
        , image: {
            uploadLimit: {}
            , allowedMimeTypes: ['image/jpg', 'image/jpeg', 'image/png']
            , sizes: {
                names: ['thumbnail', 'medium', 'large', 'full'],
                info: {
                    thumbnail: {
                        width: 150,
                        height: 150,
                        fit: 'cover'
                    }
                    , medium: {
                        width: 300
                    }
                    , large: {
                        width: 1024,
                    }
                    , full: {}
                }
            }
        }
    },
    categories: {search: {limit: 10}},
    tags: {search: {limitDefault: 10}},
    jwtTokenSingOptions: {
        expiresIn: 3600 * 1000
    },
    passportStrategy: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.secretOrKey,
    },
    passwordHash: {
        saltRounds: 10
    },
    verificationTokens: {
        defaultByteLength: 64,
        encoding: 'hex'
    }

};
export default configurations;