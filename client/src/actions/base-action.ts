import {ActionTypeCategoriesFetch} from "./creator-categories-fetch";
import {ActionTypeCategoriesFetchFulfilled} from "./creator-categories-fetch-fulfilled";
import {ActionTypeLoginResponded} from "./creator-login-responded";
import {ActionTypeLoginSend} from "./creator-login-send";
import {ActionTypeFetchUserFulfilled} from "./creator-fetch-user-fulfilled";
import {ActionTypeFetchUser} from "./creator-fetch-user";

export interface BaseAction<TypeName extends string> {
    type: TypeName;
}

export type AllActionTypes =
    ActionTypeCategoriesFetch
    | ActionTypeCategoriesFetchFulfilled
    | ActionTypeLoginResponded
    | ActionTypeLoginSend
    | ActionTypeFetchUserFulfilled
    | ActionTypeFetchUser;