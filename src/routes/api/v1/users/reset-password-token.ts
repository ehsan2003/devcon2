import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";

type localRequestHandler = RequestHandler<{token:string}, {msg:string}, {}, {}>

class ResetPasswordToken extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/:token';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {

        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ResetPasswordToken();