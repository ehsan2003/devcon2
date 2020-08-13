import {ExtractJwt, StrategyOptions} from 'passport-jwt';
import keys from "@conf/keys";
import {ResizeOptions} from 'sharp'

interface sizes {
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
    tags: { search: { limit: number } }
    categories: { search: { limit: number } }
    posts: { search: { limit: number } }
    image: {
        fileSizeLimit: number, sizes: { names: Array<keyof sizes>, info: { [p in keyof sizes]: ResizeOptions } }
    }
}

const configurations: IConfigurations = {
    image: {
        fileSizeLimit: 1024 * 1024 * 3
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
    },
    posts: {search: {limit: 100}},
    categories: {search: {limit: 10}},
    tags: {search: {limit: 10}},
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