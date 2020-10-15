import type {Action} from 'redux';

export const PROGRESS_CHANGE = 'PROGRESS_CHANGE';

export interface ActionTypeProgressChange extends Action<typeof PROGRESS_CHANGE> {
    payload: number;
}

export const progressChange = (value: number): ActionTypeProgressChange => ({
    type: PROGRESS_CHANGE
    , payload: value
});
