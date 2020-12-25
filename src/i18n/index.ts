import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ELanguage } from 'models/enums';
import moment from 'moment';
import 'moment/locale/az';

import enTranslation from 'locales/en/translation.json';

const resources = {
    en: {
        translation: enTranslation
    }
};

const selectedLng = localStorage.getItem('i18nextLng') as string;

moment.locale(selectedLng);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: selectedLng || 'en',
        fallbackLng: ELanguage.EN,
        keySeparator: '.',
    });

export default i18n;
