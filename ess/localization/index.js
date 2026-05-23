import en from './en';
import hi from './hi';
import mr from './mr';

const dictionaries = { en, hi, mr };
let activeLanguage = 'en';

export const setLanguage = language => {
  if (dictionaries[language]) {
    activeLanguage = language;
  }
};

export const t = key =>
  dictionaries[activeLanguage]?.[key] || dictionaries.en[key] || key;

export const supportedLanguages = Object.keys(dictionaries);
