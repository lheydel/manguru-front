import { Language } from '../../../utils/properties';

export enum I18nActionType {
    LANG_CHANGE = '@@i18n/LANG_CHANGE'
}

export interface I18nLangChange {
    type: I18nActionType.LANG_CHANGE;
    language: Language;
}

export type I18nAction = I18nLangChange;
