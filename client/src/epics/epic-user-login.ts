import {Epic, ofType} from "redux-observable";
import {catchError, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {ActionTypeUserLogin, USER_LOGIN} from "@actions/creator-user-login";
import {ActionTypeUserLoginFulfilled, userLoginFulfilled} from "@actions/creator-user-login-fulfilled";
import {UsersLoginRequestHandler} from "../../../src/routes/api/v1/users/login";
import {AllActions} from "@actions/index";
import rootReducer from '@reducers/index';
import {ReducerState} from "react";
import {of} from "rxjs";
import {ActionTypeUserLoginRejected, userLoginRejected} from "@actions/creator-user-login-rejected";
import {ResponseType} from '@shared/utils';
import {ActionTypeUserInfo, userInfo} from "@actions/creator-user-info";

export const epicUserLogin: Epic<AllActions, (ActionTypeUserLoginFulfilled | ActionTypeUserInfo) | ActionTypeUserLoginRejected, ReducerState<typeof rootReducer>> = (action$) =>
    action$.pipe(
        ofType<AllActions, ActionTypeUserLogin>(USER_LOGIN),
        mergeMap(action =>

            ajax({
                url: '/api/v1/users/login'
                , method: 'POST'
                , body: action.payload
            }).pipe(
                mergeMap(response => {
                    const token = (response.response as ResponseType<UsersLoginRequestHandler>).token;
                    localStorage.setItem('authorization', token);
                    return of(userLoginFulfilled(token), userInfo());
                }),
                catchError((err, caught) => of(userLoginRejected(err)))
            )
        ))
;
export default epicUserLogin;