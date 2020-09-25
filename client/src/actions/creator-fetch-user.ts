import {BaseAction} from "./base-action";
import type {ActionCreator} from 'redux';

export const FETCH_USER = 'FETCH_USER';

export interface ActionTypeFetchUser extends BaseAction<typeof FETCH_USER> {
}

export const fetchUser: ActionCreator<ActionTypeFetchUser> = () => ({
    type: FETCH_USER
});
