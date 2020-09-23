import {BaseAction} from "./base-action";
import type {ActionCreator} from 'redux';
import {UsersLoginRequestHandler} from "../../../src/routes/api/v1/users/login";
import {ResponseType} from "../../@types";

export const LOGIN_RESPONDED = 'LOGIN_RESPONDED';

export interface ActionTypeLoginResponded extends BaseAction<typeof LOGIN_RESPONDED> {
    payload: ResponseType<UsersLoginRequestHandler>;
}

export const loginResponded: ActionCreator<ActionTypeLoginResponded> = (response: ResponseType<UsersLoginRequestHandler>) => ({
    type: LOGIN_RESPONDED
    , payload: response
});
