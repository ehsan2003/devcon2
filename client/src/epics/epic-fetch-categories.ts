import {BaseAction} from "../actions/base-action";
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {FETCH_CATEGORIES} from "../actions/creator-fetch-categories";
import {ofType} from "redux-observable";
import {ajax} from "rxjs/ajax";
import {fetchCategoriesFulfilled} from "../actions/creator-fetch-categories-fulfilled";

export default (action$: Observable<BaseAction<any>>) => action$.pipe(
    ofType(FETCH_CATEGORIES),
    mergeMap(_ => ajax.getJSON('/api/v1/categories/all').pipe(
        map((response: any) => fetchCategoriesFulfilled(response.result))
    ))
);