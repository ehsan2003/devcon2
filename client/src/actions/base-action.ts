import {ActionTypeCategoriesFetch} from "./creator-categories-fetch";
import {ActionTypeCategoriesFetchFulfilled} from "./creator-categories-fetch-fulfilled";

export interface BaseAction<TypeName extends string> {
    type: TypeName;
}

export type AllActionTypes = ActionTypeCategoriesFetch | ActionTypeCategoriesFetchFulfilled;