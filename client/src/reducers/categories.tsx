import {Reducer} from "redux";
import {ICategoryDoc} from "../../../src/models/Category";
import {ActionTypes} from "../actions";
import produce from 'immer';
import {FETCH_CATEGORIES_FULFILLED} from "../actions/creator-fetch-categories-fulfilled";

export default ((state = null, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_FULFILLED:
            return;
    }
    return state;
}) as Reducer<ICategoryDoc[] | null, ActionTypes>;

function sanitizeCategories(categories: ICategoryDoc[]) {
    produce(categories, (categoriesDraft) => {
        for (const category of categoriesDraft) {
            category.childrens = categoriesDraft.filter;
        }
    });
}