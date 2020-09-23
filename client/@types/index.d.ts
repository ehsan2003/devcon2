import {RequestHandler} from "express";

export declare type ResponseType<T extends RequestHandler> = T extends RequestHandler<infer T1, infer T2, infer T3, infer T4> ? T2 : never ;