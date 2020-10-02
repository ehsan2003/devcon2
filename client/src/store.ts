import {applyMiddleware, compose, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import epics from '@epics/index';
import rootReducer from './reducers';
import {AllActions} from "@actions/index";
import {ReducerState} from "react";

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware<AllActions, AllActions, ReducerState<typeof rootReducer>>();
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(epicMiddleware)));

epicMiddleware.run(epics);

export default store;
