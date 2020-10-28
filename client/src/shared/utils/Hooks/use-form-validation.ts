import {useValidator} from "@shared/utils/Hooks/index";
import {ErrorObject} from "ajv";
import {get, reduce, set, toPath} from 'lodash';

export default <T>(schema: any, data: T, enabledProps: DeepPartial<KeysTo<T, boolean>>, serverErrors: DeepPartial<KeysTo<T, string>>): { isValid: boolean, errors: { all: DeepPartial<KeysTo<T, string>>, visible: DeepPartial<KeysTo<T, string>> } } => {
    const validation = useValidator(schema, data);

    if (validation.isValid)
        return {
            isValid: true,
            errors: {
                all: {},
                visible: {}
            }
        };
    else {
        const errors = validation.errors || [] as ErrorObject[];

        return {
            isValid: false,
            errors: reduce(
                errors
                , (base, err) => {
                    // removes '.' from the beginning of the path
                    const path = toPath(err.dataPath.substr(1));
                    const allPath = ['all', ...path];
                    const visiblePath = ['visible', ...path];
                    set(base, allPath, get(serverErrors, path) || err.message || 'invalid value');
                    if (get(enabledProps, path))
                        set(base, visiblePath, get(serverErrors, path) || err.message || 'invalid value');
                    return base;

                }
                , {
                    visible: {},
                    all: {}
                }
            ) as any

        };
    }
};