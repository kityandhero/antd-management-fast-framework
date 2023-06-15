import { App } from 'antd';

let message;
let notification;
let modal;

export function InteractionAssemble() {
  const staticFunction = App.useApp();

  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;

  return null;
}

export function destroyMessage(key) {
  message.destroy(key);
}

export { message, modal, notification };
