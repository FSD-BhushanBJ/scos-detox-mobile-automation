import { t } from '../localization';

export const getReadableError = error => {
  const message = String(error?.message || error || '');

  if (message.includes('Network request failed')) {
    return t('noInternet');
  }

  return message || t('apiFailure');
};
