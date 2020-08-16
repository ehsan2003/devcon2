import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";

type localRequestHandler = RequestHandler<{}, {msg:string,result:any}, {slug:string,enName:string,id?:string,parent?:string}, {}>

class Insert extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'post';
    readonly path: string = '/';
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

export default new Insert();