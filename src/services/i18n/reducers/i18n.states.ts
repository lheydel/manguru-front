import { DeepReadonly } from 'utility-types';
import { Language } from '../../../utils/properties';
import i18nService from '../i18n.service';

export type I18nState = DeepReadonly<{
    language: Language
}>;

export const initialI18nState = {language: i18nService.getNavigatorLanguage()};
