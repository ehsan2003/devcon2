import {combineEpics} from "redux-observable";
import categoriesFetchFulfilled from './categories-fetch-fulfilled';


export default combineEpics(categoriesFetchFulfilled);