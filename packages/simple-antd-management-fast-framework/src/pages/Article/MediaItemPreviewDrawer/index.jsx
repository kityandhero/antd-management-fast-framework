import React from 'react';
import ReactPlayer from 'react-player';
import { PictureOutlined } from '@ant-design/icons';

import {
  isArray,
  showErrorMessage,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-framework/lib/utils/tools';
import { formContentConfig } from 'antd-management-fast-framework/lib/utils/constants';
import MobileContainor from 'antd-management-fast-framework/lib/customComponents/MobileContainor';
import Base from 'antd-management-fast-framework/lib/framework/DataDrawer/Base';

class MediaItemPreviewDrawer extends Base {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        placement: 'top',
        height: '100vh',
        showBottomBar: false,
      },
    };
  }

  getNeedSetFormValueAfterLoad = () => {
    return false;
  };

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

  formContentConfigData = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.component,
              component: <MobileContainor>{this.buildArticle()}</MobileContainor>,
            },
          ],
        },
      ],
    };
  };
}

MediaItemPreviewDrawer.defaultProps = {
  data: [],
};

export default MediaItemPreviewDrawer;
