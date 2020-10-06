import {combineReducers} from "redux";
import mainMenuOpen from "./reducer-main-menu-open";
import deviceWidth from './reducer-device-width';

const Ui = combineReducers({
    mainMenuOpen,
    deviceWidth
});

export default Ui;