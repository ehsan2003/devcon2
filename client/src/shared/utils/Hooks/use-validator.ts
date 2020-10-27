import {JSONSchema7} from 'json-schema';
import {useMemo, useState} from 'react';
import Ajv, {ErrorObject} from 'ajv';

const ajv = new Ajv({
    allErrors:true
});

export interface ValidationResult {
    isPending: boolean;
    isValid: boolean;
    errors: ErrorObject[] | null | undefined;
}

export default (schema: JSONSchema7, data: any) => {
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState<null | undefined | ErrorObject[]>(null);
    return useMemo(() => {
        setIsValid(ajv.validate(schema, data) as boolean);
        setErrors(ajv.errors);
        return {isValid, errors};
    }, [data]);
};