import React from 'react';
import ReactPlayer from 'react-player';
import { PictureOutlined, UpCircleOutlined, FormOutlined, ReloadOutlined } from '@ant-design/icons';

import {
  isArray,
  showErrorMessage,
  stringIsNullOrWhiteSpace,
  showInfoMessage,
  notifySuccess,
} from 'antd-management-fast-framework/es/utils/tools';
import { cardConfig, drawerConfig } from 'antd-management-fast-framework/es/utils/constants';
import Base from 'antd-management-fast-framework/es/framework/DataDrawer/Base';
import MobilePreviewDrawer from 'antd-management-fast-framework/es/customComponents/MobileContainor/MobilePreviewDrawer';
import {
  buildButtonGroup,
  buildDropdownEllipsis,
  buildOptionItem,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

class MediaItemPreviewDrawer extends MobilePreviewDrawer {
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
      const text = '预览数据格式无效';

      showErrorMessage({
        message: text,
      });

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
        {stringIsNullOrWhiteSpace(record.title) ? null : <h3>{record.title}</h3>}
        {stringIsNullOrWhiteSpace(record.image) ? null : <img width="100%" src={record.image} />}
        {stringIsNullOrWhiteSpace(record.description) ? null : (
          <p
            style={{
              textIndent: '35px',
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

MediaItemPreviewDrawer.defaultProps = {
  data: [],
};

export default MediaItemPreviewDrawer;
