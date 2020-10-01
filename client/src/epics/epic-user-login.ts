import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {USER_LOGIN} from "@actions/creator-user-login";
import {ActionTypeUserLoginFulfilled, userLoginFulfilled} from "@actions/creator-user-login-fulfilled";
import {RequestHandler} from "express";
import {AllActions} from "@actions/base-action";
import {UsersLoginRequestHandler} from "../../../src/routes/api/v1/users/login";

type ExtractResponseType<T extends RequestHandler> = T extends RequestHandler<infer T1, infer T2, infer T3, infer T4> ? T2 : never;
export const epicUserLogin: Epic<AllActions, ActionTypeUserLoginFulfilled> = (action$) =>
    action$.pipe(
        ofType(USER_LOGIN),
        mergeMap(action =>
            ajax({
                url: '/api/v1/users/login'
                , method: 'POST'
                , body: action.payload
            }).pipe(
                map(response => {
                    const responseJson = JSON.parse(response.response) as ExtractResponseType<UsersLoginRequestHandler>;
                    return userLoginFulfilled(responseJson.token);
                }),
                catchError((err, caught) => {
                    console.log(err);
                    return caught;
                })
            )
        )
    )
;
export default epicUserLogin;