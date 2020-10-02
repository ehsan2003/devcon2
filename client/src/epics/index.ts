import {combineEpics} from "redux-observable";
import epicUserLogin from "@epics/epic-user-login";

export default combineEpics(epicUserLogin);