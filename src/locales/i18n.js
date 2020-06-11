import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translationEN from './en.json';
import translationRU from './ru.json';
import { getLang } from '../api/userLanguage';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
// i18n.on('languageChanged', function (lng) {
//   // E.g. set the moment locale with the current language
//   moment.locale(lng);
//   // then re-render your app
//   //   app.render();
// });
export default i18n;