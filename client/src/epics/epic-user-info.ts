import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap} from "rxjs/operators";
import {AllActions} from "@actions/index";
import rootReducer from '@reducers/index';
import {ReducerState} from "react";
import {ActionTypeUserInfoFulfilled, userInfoFulfilled} from "@actions/ajax/creator-user-info-fulfilled";
import {ActionTypeUserInfo, USER_INFO} from "@actions/ajax/creator-user-info";
import {ajax} from "rxjs/ajax";
import {ResponseType} from "@shared/utils";
import {UsersCurrentRequestHandler} from "../../../src/routes/api/v1/users/current";
import {ActionTypeUserInfoRejected, userInfoRejected} from "@actions/ajax/creator-user-info-rejected";
import {of} from "rxjs";


export const epicUserInfo: Epic<AllActions, ActionTypeUserInfoFulfilled | ActionTypeUserInfoRejected, ReducerState<typeof rootReducer>> = (action$, state) =>
    action$.pipe(
        ofType<AllActions, ActionTypeUserInfo>(USER_INFO),
        mergeMap(() => ajax.getJSON<ResponseType<UsersCurrentRequestHandler>>('/api/v1/users/current', {Authorization: state.value.authorization.data})
            .pipe(
                map(response => userInfoFulfilled(response.result)),
                catchError((err, caught) => of(userInfoRejected(err)))
            ))
    );
export default epicUserInfo;