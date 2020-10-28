import {JSONSchema7} from 'json-schema';
import {useMemo} from 'react';
import Ajv, {ErrorObject} from 'ajv';
import applyErrors from 'ajv-errors';

const ajv = new Ajv({
    allErrors: true, jsonPointers: true
});
applyErrors(ajv);
export interface ValidationResult {
    isValid: boolean;
    errors: ErrorObject[] | null | undefined;
}

export default (schema: JSONSchema7, data: any) => useMemo(() => ({
    isValid:ajv.validate(schema,data),
    errors:ajv.errors
}), [data]);