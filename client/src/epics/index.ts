import {combineEpics} from "redux-observable";
import epicUserLogin from "@epics/epic-user-login";
import epicUserInfo from "@epics/epic-user-info";

export default combineEpics(epicUserLogin,epicUserInfo);