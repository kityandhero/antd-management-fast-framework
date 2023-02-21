import React from 'react';

import { HtmlBox } from 'antd-management-fast-component';

import { MobilePreviewArea } from '../MobilePreviewArea';

class MobileHtmlPreviewBox extends MobilePreviewArea {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

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
