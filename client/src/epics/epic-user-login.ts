import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {ActionTypeUserLogin, USER_LOGIN} from "@actions/creator-user-login";
import {ActionTypeUserLoginFulfilled, userLoginFulfilled} from "@actions/creator-user-login-fulfilled";
import {RequestHandler} from "express";
import {UsersLoginRequestHandler} from "../../../src/routes/api/v1/users/login";
import {AllActions} from "@actions/index";
import rootReducer from '@reducers/index';
import {ReducerState} from "react";
import {of} from "rxjs";
import {ActionTypeUserLoginRejected, userLoginRejected} from "@actions/creator-user-login-rejected";

type ExtractResponseType<T extends RequestHandler> = T extends RequestHandler<infer T1, infer T2, infer T3, infer T4> ? T2 : never;
export const epicUserLogin: Epic<AllActions, ActionTypeUserLoginFulfilled | ActionTypeUserLoginRejected, ReducerState<typeof rootReducer>> = (action$) =>
    action$.pipe(
        ofType<AllActions, ActionTypeUserLogin>(USER_LOGIN),
        mergeMap(action =>
            ajax({
                url: '/api/v1/users/login'
                , method: 'POST'
                , body: action.payload
            }).pipe(
                map(response => {
                    console.log(response);
                    const responseJson = response.response as ExtractResponseType<UsersLoginRequestHandler>;
                    return userLoginFulfilled(responseJson.token);
                }),
                catchError((err, caught) => of(userLoginRejected(err)))
            )
        ));
export default epicUserLogin;