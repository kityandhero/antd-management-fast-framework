import { Empty } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { buildPlayer } from 'antd-management-fast-component';
import { MobileContainor } from 'antd-management-fast-framework';

const { MobilePreviewArea } = MobileContainor;

class MobilePreviewBox extends MobilePreviewArea {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  buildContentArea = () => {
    const { data } = this.props;

    if (!isArray(data)) {
      const text = '预览数据格式无效';

      showSimpleErrorMessage(text);

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

  buildItem = (item) => {
    if ((item || null) == null) {
      return null;
    }

    return (
      <>
        {checkStringIsNullOrWhiteSpace(item.text) ? null : (
          <p
            style={{
              textIndent: '28px',
            }}
          >
            {item.text}
          </p>
        )}

        {checkStringIsNullOrWhiteSpace(item.multiText) ? null : (
          <p
            style={{
              textIndent: '28px',
            }}
          >
            {item.multiText}
          </p>
        )}

        {checkStringIsNullOrWhiteSpace(item.image) ? null : (
          <img width="100%" src={item.image} />
        )}

        {checkStringIsNullOrWhiteSpace(item.video)
          ? null
          : buildPlayer({ url: item.video })}
      </>
    );
  };

  renderPresetInnerView = () => {
    return this.buildContentArea();
  };
}

MobilePreviewBox.defaultProps = {
  data: [],
};

export { MobilePreviewBox };
