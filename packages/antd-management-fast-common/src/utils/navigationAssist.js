function navigateTo(o) {
  const location = isString(o)
    ? {
        pathname: o,
      }
    : o;

  if (runtimeSettings.getUseNprogress()) {
    nprogress.inc();

    setTimeout(() => {
      nprogress.done();
    }, 400);
  }

  history.push(location);
}

function redirectTo(o) {
  const location = isString(o)
    ? {
        pathname: o,
      }
    : o;

  if (runtimeSettings.getUseNprogress()) {
    nprogress.inc();

    setTimeout(() => {
      nprogress.done();
    }, 400);
  }

  history.replace(location);
}

/**
 * 设置 Navigation 处理器
 */
export function setNavigationHandler() {
  setNavigator(navigateTo);
  setRedirector(redirectTo);
}
