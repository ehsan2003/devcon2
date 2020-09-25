import {Reducer} from "redux";
import {AllActionTypes} from "../actions/base-action";
import {ICategory} from "../../../src/models/Category";

export type StateCategories = (ICategory<string> & { _id: string })[] | undefined;

const categories: Reducer<StateCategories, AllActionTypes> =
    (state, action) => {
        switch (action.type) {
            case "CATEGORIES_FETCH_FULFILLED":
                return action.payload;
            case "CATEGORIES_FETCH":
                return undefined;
            default:
                return state;
        }
    };

export default categories;
