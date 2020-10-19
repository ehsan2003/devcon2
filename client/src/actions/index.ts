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
    ActionTypeAddNotification,
    ActionTypeDeviceWidthChanged,
    ActionTypeDismissNotification,
    ActionTypeLoginDialogOpenSet,
    ActionTypeMainMenuOpenSet,
    ActionTypeProgressChange,
    ActionTypeProgressSetVisibility,
    ActionTypeRemoveNotification
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
    | ActionTypeUserRegister
    | ActionTypeRemoveNotification
    | ActionTypeDismissNotification
    | ActionTypeAddNotification;