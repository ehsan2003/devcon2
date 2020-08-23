import configurations from "@conf/configurations";
import crypto from "crypto";

/**
 * resolve a random generated token by specific options
 * @param length
 */
export const getRandomToken = (length = configurations.verificationTokens.defaultByteLength) => new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buff) => {
        if (err)
            reject(err);
        resolve(buff.toString(configurations.verificationTokens.encoding));
    });
});
