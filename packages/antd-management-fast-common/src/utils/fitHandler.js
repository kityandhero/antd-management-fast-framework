import { runtimeSettings } from './dynamicSetting';
import { setLocalStorageHandler } from './localStorageAssist';
import { setMessageDisplayMonitor } from './messageAssist';
import { setNavigationHandler } from './navigationAssist';
import { setNotificationDisplayMonitor } from './notificationAssist';
import { setSessionStorageHandler } from './sessionStorageAssist';

export function setEasySoftUtilityHandler() {
  setLoggerDisplaySwitch(runtimeSettings.getShowLogInConsole());

  setLocalStorageHandler();
  setNavigationHandler();
  setMessageDisplayMonitor();
  setNotificationDisplayMonitor();
  setSessionStorageHandler();
}
