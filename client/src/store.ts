import {applyMiddleware, compose, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import epics from '@epics/index';
import rootReducer from './reducers';
import {AllActions} from "@actions/index";
import {ReducerState} from "react";
import {deviceWidthChanged} from "@actions/creator-device-width-changed";

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware<AllActions, AllActions, ReducerState<typeof rootReducer>>();
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(epicMiddleware)));

window.addEventListener('resize', () =>
    store.dispatch(deviceWidthChanged(window.innerWidth, window.innerHeight))
);


epicMiddleware.run(epics);

export default store;
