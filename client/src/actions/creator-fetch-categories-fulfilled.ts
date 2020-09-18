import {BaseAction} from "./base-action";
import {ICategoryDoc} from "../../../src/models/Category";

export const FETCH_CATEGORIES_FULFILLED = 'FETCH_CATEGORIES_FULFILLED';

export interface ActionTypeFetchCategoriesFulfilled extends BaseAction<typeof FETCH_CATEGORIES_FULFILLED> {
    payload: ICategoryDoc[];
}

export const fetchCategoriesFulfilled = (categories: ICategoryDoc[]) => ({
    type: FETCH_CATEGORIES_FULFILLED
    , payload: categories
});
