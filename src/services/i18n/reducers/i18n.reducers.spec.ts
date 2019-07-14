import { I18nAction, I18nActionType } from '../actions/i18n.actions';
import { Language } from '../../../utils/properties';
import { I18nReducer } from './i18n.reducers';
import { initialI18nState, I18nState } from './i18n.states';

test('changeLanguage', () => {
    const action: I18nAction = {
        type: I18nActionType.LANG_CHANGE,
        language: Language.FR
    };

    const state: I18nState = {
        language: Language.FR
    };

    expect(I18nReducer.reducer(initialI18nState, action)).toEqual(state);
    expect(I18nReducer.reducer(undefined, action)).toEqual(state);
});
