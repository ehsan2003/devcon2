import { JSONSchema7 } from 'json-schema';
import { useEffect, useState } from 'react';
import Ajv, { ErrorObject } from 'ajv';

const ajv = new Ajv();

export default (schema: JSONSchema7, data: any) => {
    const [isValid, setIsValid] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [errors, setErrors] = useState<ErrorObject[] | null | undefined>(null);
    useEffect(() => {
        const tmp = ajv.validate(schema, data);
        if (isPromise(tmp)) {
            if (!isPending)
                setIsPending(true);
            (tmp as PromiseLike<any>).then(result => {
                setIsPending(false);
                setIsValid(result);
                setErrors(ajv.errors);
            });
        } else {
            if (isPending)
                setIsPending(false);
            setIsValid(tmp as boolean);
            setErrors(ajv.errors);
        }
    }, [data, isPending]);
    return {
        isValid,
        isPending,
        errors
    };
};

function isPromise(data: any) {
    return !!data.then;
}