import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import {Localization} from 'expo-localization';

import translationEnglish from './translations/english/translation.json';
import translationPortuguese from './translations/portuguese/translation.json';
import translationFrench from './translations/french/translation.json';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
// const languageDetector = {
//   type: 'languageDetector',
//   async: true, // flags below detection to be async
//   detect: callback => {
//     return /*'en'; */ Localization.getLocalizationAsync().then(({locale}) => {
//       console.log('locale', locale);
//       callback(locale);
//     });
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

const resources = {
  en: {
    translation: translationEnglish,
  },
  pt: {
    translation: translationPortuguese,
  },
  fr: {
    translation: translationFrench,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'pt',
  fallbackLng: 'en',
  resources: resources,
  // ns: ['common'],
  // defaultNS: 'common',
  // debug: true,
  // interpolation: {
  //   escapeValue: false, // not needed for react as it does escape per default to prevent xss!
  // },
});

export default i18n;
