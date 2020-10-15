import {
    ActionTypeUserInfo,
    ActionTypeUserInfoFulfilled,
    ActionTypeUserInfoRejected,
    ActionTypeUserLogin,
    ActionTypeUserLoginFulfilled,
    ActionTypeUserLoginRejected,
    ActionTypeUserLogout,
    ActionTypeUserRegister
} from "@actions/ajax";
import {
    ActionTypeDeviceWidthChanged,
    ActionTypeLoginDialogOpenSet,
    ActionTypeMainMenuOpenSet,
    ActionTypeProgressChange,
    ActionTypeProgressSetVisibility
} from "@actions/ui";

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