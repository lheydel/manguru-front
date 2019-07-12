import i18nService from './i18n.service';
import { Language } from '../../../utils/properties';

const languageGetter = jest.spyOn(navigator, 'language', 'get');

it.each`
    language     | expected
    ${'fr'}      | ${Language.FR}
    ${'en'}      | ${Language.EN}
    ${'en-US'}   | ${Language.EN}
    ${'blblbl'}  | ${Language.DEFAULT}
`('should return [$expected] when navigator language is [$language]', ({language, expected}) => {
    languageGetter.mockReturnValueOnce(language);
    expect(i18nService.getNavigatorLanguage()).toBe(expected);
});
