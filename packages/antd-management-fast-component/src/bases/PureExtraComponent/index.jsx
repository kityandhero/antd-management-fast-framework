import { PureComponent } from 'react';

import {
  buildPromptModuleInfo,
  getGuid,
  logCallResult as logCallResultCore,
  logCallTrace as logCallTraceCore,
  logCallTrack as logCallTrackCore,
  logDebug,
  mergeArrowText,
  mergeTextMessage,
  toBoolean,
  toString,
} from 'easy-soft-utility';

import { modulePackageName } from '../../utils/definition';

class PureExtraComponent extends PureComponent {
  componentName = '';

  showCallProcessSwitchPromptComplete = false;

  /**
   * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
   */
  keyPrefix = '';

  constructor(properties) {
    super(properties);

    this.componentName = this.constructor.name;

    this.keyPrefix = getGuid();
  }

  buildPromptModuleInfoText(text, ...ancillaryInformation) {
    return buildPromptModuleInfo(
      modulePackageName,
      mergeTextMessage(text, mergeArrowText(...ancillaryInformation)),
      this.componentName,
    );
  }

  promptCallProcessSwitch = () => {
    const { showCallProcess } = this.props;

    if (!this.showCallProcessSwitchPromptComplete) {
      logDebug(
        {},
        mergeArrowText(
          this.componentName,
          'showCallProcess',
          toString(toBoolean(showCallProcess)),
          'do not show call process, if want wo show it, please set "showCallProcess" in properties to true',
        ),
      );

      this.showCallProcessSwitchPromptComplete = true;
    }
  };

  /**
   * log call track
   * @param {*} message
   */
  logCallTrack(data, ...messages) {
    const { showCallProcess } = this.props;

    if (!showCallProcess) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallTrackCore(data, this.buildPromptModuleInfoText(...messages));
  }

  /**
   * log call trace
   * @param {*} message
   */
  logCallTrace(data, ...messages) {
    const { showCallProcess } = this.props;

    if (!showCallProcess) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallTraceCore(data, this.buildPromptModuleInfoText(...messages));
  }

  /**
   * log call result
   * @param {*} message
   */
  logCallResult(data, ...messages) {
    const { showCallProcess } = this.props;

    if (!showCallProcess) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallResultCore(data, this.buildPromptModuleInfoText(...messages));
  }

  buildOverloadErrorText(...texts) {
    return mergeArrowText(
      this.componentName,
      'need overrode to implement',
      ...texts,
    );
  }
}

PureExtraComponent.defaultProps = {
  showCallProcess: false,
};

export { PureExtraComponent };
