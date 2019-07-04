import { UserState, initialUserState } from '../user/reducers/user.states';

export interface ApplicationState {
    user: UserState;
}

export const initialAppState: ApplicationState = {
    user: initialUserState
};
