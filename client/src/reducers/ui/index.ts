import {combineReducers} from "redux";
import mainMenuOpen from "./reducer-main-menu-open";
import deviceWidth from './reducer-device-width';
import mainProgress from "@reducers/ui/reducer-main-progress";
import loginDialog from "@reducers/ui/reducer-login-dialog";

const Ui = combineReducers({
    mainMenuOpen,
    deviceWidth,
    mainProgress,
    loginDialog
});

export default Ui;