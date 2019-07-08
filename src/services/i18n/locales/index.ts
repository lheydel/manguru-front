import catalogEn from './en/messages';
import catalogFr from './fr/messages';
import { Language } from '../../../utils/properties';

const catalogs = {
    [Language.EN]: catalogEn,
    [Language.FR]: catalogFr
  };

export default catalogs;
