import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap} from "rxjs/operators";
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

export const epicUserLogin: Epic<AllActions, ActionTypeUserLoginFulfilled | ActionTypeUserLoginRejected, ReducerState<typeof rootReducer>> = (action$) =>
    action$.pipe(
        ofType<AllActions, ActionTypeUserLogin>(USER_LOGIN),
        mergeMap(action =>
            ajax({
                url: '/api/v1/users/login'
                , method: 'POST'
                , body: action.payload
            }).pipe(
                map(response =>
                    userLoginFulfilled((response.response as ResponseType<UsersLoginRequestHandler>).token)
                ),
                catchError((err, caught) => of(userLoginRejected(err)))
            )
        ));
export default epicUserLogin;