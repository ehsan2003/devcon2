import type {Action} from 'redux';

export const MAIN_MENU_OPEN_SET = 'MAIN_MENU_OPEN_SET';

export interface ActionTypeMainMenuOpenSet extends Action<typeof MAIN_MENU_OPEN_SET> {
    payload: boolean;
}

export const mainMenuOpenSet = (open: boolean): ActionTypeMainMenuOpenSet => ({
    type: MAIN_MENU_OPEN_SET
    , payload: open
});