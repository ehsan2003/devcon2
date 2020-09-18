import {BaseAction} from "./base-action";

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export interface ActionTypeFetchCategories extends BaseAction<typeof FETCH_CATEGORIES> {

}

export const fetchCategories = () => ({
    type: FETCH_CATEGORIES
});