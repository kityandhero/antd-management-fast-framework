import React from 'react';
import { PictureOutlined } from '@ant-design/icons';

import {
  isArray,
  showErrorMessage,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-framework/es/utils/tools';
import MobilePreviewArea from 'antd-management-fast-framework/es/customComponents/MobileContainor/MobilePreviewArea';
import {
  buildButtonGroup,
  buildDropdownEllipsis,
  buildOptionItem,
  buildPlayer,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

class MobilePreviewBox extends MobilePreviewArea {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{},
    };
  }

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
        {stringIsNullOrWhiteSpace(record.video) ? null : buildPlayer({ url: record.video })}
      </>
    );
  };

  renderInnerView = () => {
    return this.buildArticle();
  };
}

MobilePreviewBox.defaultProps = {
  data: [],
};

export default MobilePreviewBox;
