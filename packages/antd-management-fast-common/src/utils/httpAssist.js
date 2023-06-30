import { adjustUrl } from 'easy-soft-utility';

import { getCorsDomain } from './settingAssist';

export function adjustUploadUrl(url) {
  const index = url.indexOf('://');

  if (index < 0) {
    return adjustUrl(url, getCorsDomain());
  }

  return adjustUrl(url);
}
