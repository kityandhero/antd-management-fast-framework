import React from 'react';
import { Space, Alert } from 'antd';
import ReactPlayer from 'react-player';
import { PictureOutlined, ReloadOutlined } from '@ant-design/icons';

import {
  isArray,
  showErrorMessage,
  stringIsNullOrWhiteSpace,
  inCollection,
} from 'antd-management-fast-framework/es/utils/tools';
import MobilePreviewArea from 'antd-management-fast-framework/es/customComponents/MobileContainor/MobilePreviewArea';
import HtmlBox from 'antd-management-fast-framework/es/customComponents/HtmlBox';
import {
  buildButtonGroup,
  buildDropdownEllipsis,
  buildOptionItem,
  buildButton,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

class ContentPreviewBox extends MobilePreviewArea {
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

ContentPreviewBox.defaultProps = {
  data: [],
};

export default ContentPreviewBox;
