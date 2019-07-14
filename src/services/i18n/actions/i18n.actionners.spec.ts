import i18nActionners from './i18n.actionners';
import { Language } from '../../../utils/properties';
import { I18nAction, I18nActionType } from './i18n.actions';

describe('changeLanguage', () => {

    test('lang change', () => {
        const action: I18nAction = {
            type: I18nActionType.LANG_CHANGE,
            language: Language.DEFAULT
        };
        expect(i18nActionners.changeLanguage(action.language)).toEqual(action);
    });
});
