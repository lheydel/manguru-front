import { Language } from '../../../utils/properties';
import { I18nAction, I18nActionType } from './i18n.actions';

/**
 * Define actions on i18n
 * Possible actions:
 *  - changeLanguage
 */
class I18nActions {

    public changeLanguage(language: Language): I18nAction {
        return {
            type: I18nActionType.LANG_CHANGE,
            language: language
        };
    }
}

export default new I18nActions();
