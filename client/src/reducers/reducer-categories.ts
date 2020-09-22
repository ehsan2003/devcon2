import {Reducer} from 'redux';
import {ICategory} from "../../../src/models/Category";
import {AllActionTypes} from "../actions/base-action";
import {CATEGORIES_FETCH} from "../actions/creator-categories-fetch";
import {CATEGORIES_FETCH_FULFILLED} from "../actions/creator-categories-fetch-fulfilled";

export default (((state, action) => {
    switch (action.type) {
        case CATEGORIES_FETCH:
            return null;
        case CATEGORIES_FETCH_FULFILLED:
            return action.payload;
    }
}) as Reducer<(ICategory & { _id: string })[] | null, AllActionTypes>);