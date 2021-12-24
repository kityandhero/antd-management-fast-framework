import React from 'react';

import HtmlBox from '../../HtmlBox';
import MobilePreviewArea from '../MobilePreviewArea';

class MobileHtmlPreviewBox extends MobilePreviewArea {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{},
    };
  }

  buildContent = () => {
    const { html } = this.props;

    return <HtmlBox html={html} />;
  };

  renderInnerView = () => {
    return this.buildContent();
  };
}

MobileHtmlPreviewBox.defaultProps = {
  html: '',
};

export default MobileHtmlPreviewBox;
