import {BaseAction} from "./base-action";
import type {ActionCreator} from 'redux';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export interface ActionTypeFetchCategories extends BaseAction<typeof FETCH_CATEGORIES> {
}

export const fetchCategories: ActionCreator<ActionTypeFetchCategories> = () => ({
    type: FETCH_CATEGORIES
});
