import Ajv from 'ajv';
import {JSONSchema7} from "json-schema";

const ajv = new Ajv();
export const CreateValidator = (schema: JSONSchema7) => {
    const validator = ajv.compile(schema);
    return (data: any) => {
        return {isValid:validator(data),errors:validator.errors};
    };
};
