import logger from "../../../../devcon/src/shared/logger";

export function isValidRegexP(pattern: string) {
    try {
        new RegExp(pattern);
        return true;
    } catch (err) {
        if (err instanceof SyntaxError)
            throw err;
        else
            logger.log('error', 'some thing went wrong when validating regular expression', {err})
    }
}