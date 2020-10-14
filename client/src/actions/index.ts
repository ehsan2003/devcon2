import {ActionTypeUserLoginFulfilled} from "@actions/creator-user-login-fulfilled";
import {ActionTypeUserLogin} from "@actions/creator-user-login";
import {ActionTypeUserLoginRejected} from "@actions/creator-user-login-rejected";
import {ActionTypeMainMenuOpenSet} from "@actions/creator-main-menu-open-set";
import {ActionTypeDeviceWidthChanged} from "@actions/creator-device-width-changed";
import {ActionTypeUserInfo} from "@actions/creator-user-info";
import {ActionTypeUserInfoFulfilled} from "@actions/creator-user-info-fulfilled";
import {ActionTypeUserInfoRejected} from "@actions/creator-user-info-rejected";
import {ActionTypeProgressChange} from "@actions/creator-progress-change";
import {ActionTypeProgressSetVisibility} from "@actions/creator-progress-set-visibility";
import {ActionTypeLoginDialogOpenSet} from "@actions/creator-login-dialog-open-set";
import {ActionTypeUserLogout} from "@actions/creator-user-logout";
import {ActionTypeUserRegister} from "@actions/creator-user-register";

export type AllActions =
    ActionTypeUserLoginFulfilled
    | ActionTypeUserLogin
    | ActionTypeUserLoginRejected
    | ActionTypeMainMenuOpenSet
    | ActionTypeDeviceWidthChanged
    | ActionTypeUserInfo
    | ActionTypeUserInfoFulfilled
    | ActionTypeUserInfoRejected
    | ActionTypeProgressChange
    | ActionTypeProgressSetVisibility
    | ActionTypeLoginDialogOpenSet
    | ActionTypeUserLogout
    | ActionTypeUserRegister;