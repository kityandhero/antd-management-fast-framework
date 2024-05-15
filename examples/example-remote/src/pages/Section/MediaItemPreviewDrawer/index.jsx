import { Empty } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { buildPlayer, iconBuilder } from 'antd-management-fast-component';
import {
  MobileContainor,
  switchControlAssist,
} from 'antd-management-fast-framework';

const { MobilePreviewDrawer } = MobileContainor;

const visibleFlag = 'ebaf51f7165f41a3a8db4e20cdfd263d';

class MediaItemPreviewDrawer extends MobilePreviewDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

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
      showSimpleErrorMessage('预览数据格式无效');

      return null;
    }

    const list = data.map((item, index) => {
      return { ...item, key: `data_${index}` };
    });

    if (list.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

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

  renderInnerView = () => {
    return this.buildArticle();
  };
}

MediaItemPreviewDrawer.defaultProps = {
  data: [],
};

export { MediaItemPreviewDrawer };
