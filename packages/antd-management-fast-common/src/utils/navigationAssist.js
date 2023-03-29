import { history } from '@umijs/max';

import {
  getNow,
  isObject,
  isString,
  logTrace,
  seededRandom,
  setNavigator,
  setRedirector,
  startProgress,
  stopProgress,
} from 'easy-soft-utility';

function showProgress(o) {
  if (isObject(o)) {
    const { withProgress = false } = {
      withProgress: false,
      ...o,
    };

    if (withProgress) {
      logTrace('navigate to with progress');

      startProgress();

      const v = seededRandom({
        seed: getNow().getMilliseconds(),
        min: 300,
        max: 600,
      });

      setTimeout(() => {
        stopProgress();
      }, v);
    }
  }
}

function navigateTo(o) {
  const location = isString(o)
    ? {
        pathname: o,
      }
    : o;

  showProgress(o);

  history.push(location);
}

function redirectTo(o) {
  const location = isString(o)
    ? {
        pathname: o,
      }
    : o;

  showProgress(o);

  history.replace(location);
}

/**
 * 设置 Navigation 处理器
 */
export function setNavigationHandler() {
  setNavigator(navigateTo);
  setRedirector(redirectTo);
}
