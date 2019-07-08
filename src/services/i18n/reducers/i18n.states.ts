import { DeepReadonly } from 'utility-types';
import { Language } from '../../../utils/properties';

export type I18nState = DeepReadonly<{
    language: Language
}>;

// TODO adapt initial language to browser default
export const initialI18nState = {language: Language.EN};
