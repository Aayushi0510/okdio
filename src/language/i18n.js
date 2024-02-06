import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// en
import defaultEnglish from "./en/en.json";
// turkish
import turkish from "./turkish/turkish.json";

// all translations
const resources = {
  en: {
    translation: defaultEnglish,
  },

  turkish: {
    translation: turkish,
  },
};

i18n.use(initReactI18next).init({
  // we init with resources
  resources,
  // lng: "en",
  lng: "turkish", // localStorage.getItem("i18nextLng") || "en",
  fallbackLng: "turkish",
  debug: false,

  // have a common namespace used around the full app
  ns: ["translation"],
  defaultNS: "translation",

  // keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false,
  },

  // react: {
  //   hashTransKey: function (defaultValue) {
  //     // return a key based on defaultValue or if you prefer to just remind you should set a key return false and throw an error
  //   },
  //   // defaultTransParent: 'div', // a valid react element - required before react 16
  //   transEmptyNodeValue: "", // what to return for empty Trans
  //   transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
  //   transKeepBasicHtmlNodesFor: ["br", "strong", "i", "span"], // don't convert to <1></1> if simple react elements
  //   transWrapTextNodes: "br", // Wrap text nodes in a user-specified element.
  //   // i.e. set it to 'span'. By default, text nodes are not wrapped.
  //   // Can be used to work around a well-known Google Translate issue with React apps. See: https://github.com/facebook/react/issues/11538
  //   // (v11.10.0)
  // },
});

export default i18n;
