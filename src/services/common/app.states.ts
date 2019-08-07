import { UserState, initialUserState } from '../user/reducers/user.states';
import { I18nState, initialI18nState } from '../i18n/reducers/i18n.states';

export interface ApplicationState {
    user: UserState;
    i18n: I18nState;
}

export const initialAppState: ApplicationState = {
    user: initialUserState,
    i18n: initialI18nState
};
