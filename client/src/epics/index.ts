import fetchCategories from './epic-fetch-categories';
import {combineEpics} from "redux-observable";

export default combineEpics(fetchCategories);
