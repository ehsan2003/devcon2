import {BaseAction} from "./base-action";
import type {ActionCreator} from 'redux';

export const CATEGORIES_FETCH = 'CATEGORIES_FETCH';

export interface ActionTypeCategoriesFetch extends BaseAction<typeof CATEGORIES_FETCH> {
}

export const categoriesFetch: ActionCreator<ActionTypeCategoriesFetch> = () => ({
    type: CATEGORIES_FETCH
});
