import { I18nState, initialI18nState } from './i18n.states';
import { I18nAction, I18nActionType } from '../actions/i18n.actions';

export class I18nReducer {

    // public static makeReducer() {
    //     return combineReducers({
    //         language: I18nReducer.language
    //     });
    // }

    public static reducer(state: I18nState = initialI18nState, action: I18nAction): I18nState {
        if (action.type === I18nActionType.LANG_CHANGE) {
            return {...state, language: action.language};
        } // else

        return state;
    }
}

export default I18nReducer.reducer;
