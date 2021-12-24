import React from 'react';
import ReactPlayer from 'react-player';
import { PictureOutlined } from '@ant-design/icons';

import {
  isArray,
  showErrorMessage,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-framework/es/utils/tools';
import MobilePreviewDrawer from 'antd-management-fast-framework/es/customComponents/MobileContainor/MobilePreviewDrawer';

class ContentPreviewDrawer extends MobilePreviewDrawer {
  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{},
    };
  }

  renderTitleIcon = () => {
    return <PictureOutlined />;
  };

  renderTitle = () => {
    return '媒体图文预览';
  };

  buildArticle = () => {
    const { data } = this.props;

    if (!isArray(data)) {
      showErrorMessage('预览数据格式无效');

      return null;
    }

    const list = data.map((item, index) => {
      return { ...item, ...{ key: `data_${index}` } };
    });

    return (
      <>
        {list.map((o) => {
          return <div key={o.key}>{this.buildItem(o)}</div>;
        })}
      </>
    );
  };

  buildItem = (record) => {
    if ((record || null) == null) {
      return null;
    }

    return (
      <>
        {stringIsNullOrWhiteSpace(record.image) ? null : <img width="100%" src={record.image} />}
        {stringIsNullOrWhiteSpace(record.description) ? null : (
          <p
            style={{
              textIndent: '28px',
            }}
          >
            {record.description}
          </p>
        )}
        {stringIsNullOrWhiteSpace(record.video) ? null : (
          <ReactPlayer width={'100%'} height="auto" url={record.video} controls />
        )}
      </>
    );
  };

  renderInnerView = () => {
    return this.buildArticle();
  };
}

ContentPreviewDrawer.defaultProps = {
  data: [],
};

export default ContentPreviewDrawer;
