import {applyMiddleware, compose, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import epics from './epics';
import rootReducer from './reducers';

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(epicMiddleware)));

epicMiddleware.run(epics);

export default store;
