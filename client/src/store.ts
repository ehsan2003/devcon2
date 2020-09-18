import rootReducer from './reducers';
import {applyMiddleware, compose, createStore} from "redux";
import epics from './epics';
import {createEpicMiddleware} from "redux-observable";

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer
    , composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(epics);
