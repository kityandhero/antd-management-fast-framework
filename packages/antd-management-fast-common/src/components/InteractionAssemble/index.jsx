import { App } from 'antd';

let message;
let notification;
let modal;

/**
 * 配置引入 antd 交互组件 Message、Modal、Notification
 * @function
 * @example
 * import { App } from 'antd';
 *
 * <App>
 *   <InteractionAssemble />
 *
 *   <div>other</div>
 * </App>
 */
export function InteractionAssemble() {
  const staticFunction = App.useApp();

  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;

  return null;
}

/**
 * 销毁指定的 antd Message 组件
 * @function
 * @param {string} key message 标记
 */
export function destroyMessage(key) {
  message.destroy(key);
}

export { message, modal, notification };
