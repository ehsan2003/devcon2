import {BaseAction} from "./base-action";
import type {ActionCreator} from 'redux';
import {ICategory} from "../../../src/models/Category";

export const CATEGORIES_FETCH_FULFILLED = 'CATEGORIES_FETCH_FULFILLED';

export interface ActionTypeCategoriesFetchFulfilled extends BaseAction<typeof CATEGORIES_FETCH_FULFILLED> {
    payload: (ICategory<string> & { _id: string })[];
}

export const categoriesFetchFulfilled: ActionCreator<ActionTypeCategoriesFetchFulfilled> = (categories: (ICategory<string> & { _id: string })[]) => ({
    type: CATEGORIES_FETCH_FULFILLED
    , payload: categories
});
