import { Divider, Space } from 'antd';
import React, { PureComponent } from 'react';

import { isArray, isBoolean, isObject } from 'easy-soft-utility';

class TabBarExtraBox extends PureComponent {
  render() {
    const { list, split } = this.props;

    const listItem = isArray(list) ? list : isObject(list) ? [list] : [];

    if (listItem.length <= 0) {
      return null;
    }

    return (
      <Space
        split={
          isBoolean(split) ? split ? <Divider type="vertical" /> : null : split
        }
      >
        {listItem}
      </Space>
    );
  }
}

TabBarExtraBox.defaultProps = {
  list: [],
  split: false,
};

export { TabBarExtraBox };
