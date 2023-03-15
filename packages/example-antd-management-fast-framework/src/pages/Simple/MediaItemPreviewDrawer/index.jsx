import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { buildPlayer, iconBuilder } from 'antd-management-fast-component';
import { MobileContainor } from 'antd-management-fast-framework';

const { MobilePreviewDrawer } = MobileContainor;

class MediaItemPreviewDrawer extends MobilePreviewDrawer {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  renderPresetTitleIcon = () => {
    return iconBuilder.picture();
  };

  renderPresetTitle = () => {
    return '媒体图文预览';
  };

  buildArticle = () => {
    const { data } = this.props;

    if (!isArray(data)) {
      const text = '预览数据格式无效';

      showSimpleErrorMessage(text);

      return null;
    }

    const list = data.map((item, index) => {
      return { ...item, key: `data_${index}` };
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
        {checkStringIsNullOrWhiteSpace(record.image) ? null : (
          <img width="100%" src={record.image} />
        )}
        {checkStringIsNullOrWhiteSpace(record.description) ? null : (
          <p
            style={{
              textIndent: '28px',
            }}
          >
            {record.description}
          </p>
        )}
        {checkStringIsNullOrWhiteSpace(record.video)
          ? null
          : buildPlayer({ url: record.video })}
      </>
    );
  };

  renderPresetInnerView = () => {
    return this.buildArticle();
  };
}

MediaItemPreviewDrawer.defaultProps = {
  data: [],
};

export default MediaItemPreviewDrawer;
