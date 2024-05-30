import React from 'react';

import { HtmlBox } from 'antd-management-fast-component';

import { MobilePreviewArea } from '../MobilePreviewArea';

class MobileHtmlPreviewBox extends MobilePreviewArea {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  /**
   * @constructs
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  buildContent = () => {
    const { html } = this.props;

    return <HtmlBox html={html} />;
  };

  renderPresetInnerView = () => {
    return this.buildContent();
  };
}

MobileHtmlPreviewBox.defaultProps = {
  ...MobilePreviewArea.defaultProps,
  html: '',
};

export { MobileHtmlPreviewBox };
