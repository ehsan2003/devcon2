import {Epic, ofType} from "redux-observable";
import {catchError, mergeMap} from "rxjs/operators";
import {ajax, AjaxError} from "rxjs/ajax";
import {ActionTypeUserLogin, USER_LOGIN} from "@actions/ajax/creator-user-login";
import {ActionTypeUserLoginFulfilled, userLoginFulfilled} from "@actions/ajax/creator-user-login-fulfilled";
import {UsersLoginRequestHandler} from "../../../src/routes/api/v1/users/login";
import {AllActions} from "@actions/index";
import rootReducer from '@reducers/index';
import React, {ReducerState} from "react";
import {of} from "rxjs";
import {ActionTypeUserLoginRejected, userLoginRejected} from "@actions/ajax/creator-user-login-rejected";
import {ResponseType} from '@shared/utils';
import {ActionTypeUserInfo, userInfo} from "@actions/ajax/creator-user-info";
import {isValidSiteError} from "@shared/utils/is-valid-site-error";
import {ActionTypeAddNotification, addNotification} from "@actions/ui";
import {DismissNotificationButton} from "@shared/utils/components";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

export const epicUserLogin: Epic<AllActions, (ActionTypeUserLoginFulfilled | ActionTypeUserInfo) | ActionTypeUserLoginRejected | ActionTypeAddNotification, ReducerState<typeof rootReducer>> = (action$) =>
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
                catchError((err, caught) => {
                    if (!(err instanceof AjaxError) || !isValidSiteError(err)) {
                        return of(addNotification('unknown site error',
                            {
                                variant: 'error'
                                , persist: false,
                                action: key => <>
                                    <Button color={'inherit'} component={Link} to={'/help-us-fix-errors'}>
                                        help us fix it too
                                    </Button>
                                    <DismissNotificationButton notificationKey={key} color={'inherit'} variant={'text'}/>
                                </>
                            }));
                    }
                    return of(userLoginRejected(err));
                })
            )
        ))
;
export default epicUserLogin;