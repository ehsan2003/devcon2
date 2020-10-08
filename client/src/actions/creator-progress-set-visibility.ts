import type {Action} from 'redux';

export const PROGRESS_SET_VISIBILITY = 'PROGRESS_SET_VISIBILITY';

export interface ActionTypeProgressSetVisibility extends Action<typeof PROGRESS_SET_VISIBILITY> {
    payload: boolean;
}

export const progressSetVisibility = (visibility: boolean): ActionTypeProgressSetVisibility => ({
    type: PROGRESS_SET_VISIBILITY
    , payload: visibility
});
