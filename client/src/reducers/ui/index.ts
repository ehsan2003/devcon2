import {combineReducers} from "redux";
import mainMenuOpen from "./reducer-main-menu-open";
import deviceWidth from './reducer-device-width';
import mainProgress from "@reducers/ui/reducer-main-progress";

const Ui = combineReducers({
    mainMenuOpen,
    deviceWidth,
    mainProgress
});

export default Ui;