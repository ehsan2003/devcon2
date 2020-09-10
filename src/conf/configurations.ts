import {ExtractJwt, StrategyOptions} from 'passport-jwt';
import keys from "@conf/keys";
import {Options} from 'multer';
import {ResizeOptions} from "sharp";

interface PostSizes {
    thumbnail: 'thumbnail';
    large: 'large';
    medium: 'medium';
    full: 'full';
}

interface AvatarSizes {
    thumbnail: 'thumbnail';
    large: 'large';
    medium: 'medium';
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
            uploadLimit: Options['limits'], allowedMimeTypes: string[], sizes: { names: string[], info: { [p: string]: ResizeOptions } }

        }
    };
    profile: {
        avatar: {
            uploadLimit:
                Options['limits'], allowedMimeTypes: string[], sizes: { names: string[], info: { [p: string]: ResizeOptions } }
        }
    };

}

const configurations: IConfigurations = {
    posts: {
        search: {limit: 100}
        , image: {
            uploadLimit: {
                fileSize: 1024 * 1024 * 3
            }
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
    profile: {
        avatar: {
            allowedMimeTypes: ['image/png']
            , sizes: {
                names: ['thumbnail', 'large', 'medium'],
                info: {
                    thumbnail: {
                        background: {alpha: 0, r: 0, b: 0, g: 0},
                        fit: 'contain'
                        , width: 60
                        , height: 60
                    }, large: {
                        background: {alpha: 0, r: 0, b: 0, g: 0},
                        fit: "contain"
                        , width: 400
                        , height: 400
                    }, medium: {
                        background: {alpha: 0, r: 0, b: 0, g: 0},
                        fit: "contain"
                        , width: 200
                        , height: 200
                    }
                }
            }, uploadLimit: {fileSize: 1024 * 1024 * 3}
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