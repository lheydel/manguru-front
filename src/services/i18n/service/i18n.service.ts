import { Language } from '../../../utils/properties';
import catalogs from '../locales';
import { setupI18n, I18n } from '@lingui/core';

class I18nService {

    public i18n: I18n;

    constructor() {
        this.i18n = setupI18n({
            catalogs: catalogs
        });
    }

    /**
     * Get the user's preferred language
     * @return the user's favorite language if it is supported,
     *         the default language else
     */
    public getNavigatorLanguage(): Language {
        const lang = navigator.language.split('-')[0].toUpperCase();

        if (Object.keys(Language).includes(lang)) {
          return (Language as any)[lang];
        } // else

        return Language.DEFAULT;
    }
}

export default new I18nService();
