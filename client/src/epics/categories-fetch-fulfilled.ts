import {Epic, ofType} from "redux-observable";
import {ReducerState} from "react";
import {AllActionTypes} from "../actions/base-action";
import {
    ActionTypeCategoriesFetchFulfilled,
    categoriesFetchFulfilled
} from "../actions/creator-categories-fetch-fulfilled";
import rootReducer from '../reducers';
import {CATEGORIES_FETCH} from "../actions/creator-categories-fetch";
import {map, mergeMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {ResponseType} from "../../@types";
import {CategoriesAllRequestHandler} from "../../../src/routes/api/v1/categories/all";

export default ((action$) => action$.pipe(
    ofType(CATEGORIES_FETCH),
    mergeMap(() => ajax.getJSON<ResponseType<CategoriesAllRequestHandler>>('/api/v1/categories/all').pipe(
        map((response) => categoriesFetchFulfilled(response.result))
    ))
)) as Epic<AllActionTypes, ActionTypeCategoriesFetchFulfilled, ReducerState<typeof rootReducer>>;