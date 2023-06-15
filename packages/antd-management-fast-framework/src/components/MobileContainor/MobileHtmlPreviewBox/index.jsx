import React from 'react';

import { HtmlBox } from 'antd-management-fast-component';

import { MobilePreviewArea } from '../MobilePreviewArea';

class MobileHtmlPreviewBox extends MobilePreviewArea {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

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
  html: '',
};

export { MobileHtmlPreviewBox };
