import {useValidator} from "@shared/utils/Hooks";
import {merge, reduce, set, toPath} from "lodash";

export default <T, SE extends DeepPartial<KeysTo<T, string>>>(schema: any, data: T, serverErrors: SE): {
    isValid: true,
    errors: {}
} | { isValid: false, errors: DeepPartial<KeysTo<T, string>> & SE } => {
    const validationResult = useValidator(schema, data);
    if (validationResult.isValid)
        return {
            isValid: true,
            errors: {}
        };
    const validationErrors = reduce(validationResult.errors, (base, err) => {
        const path = toPath(err.dataPath);
        set(base, path, err.message);
        return base;
    }, {});
    return {
        isValid: false,
        errors: merge({}, validationErrors, serverErrors)
    };
};