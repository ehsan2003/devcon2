import {combineReducers} from "redux";
import categories from './reducer-categories';
import authorizationToken from './reducer-authorization-token';
import user from './reducer-user';

export default combineReducers({
    categories,
    user,
    authorizationToken
});