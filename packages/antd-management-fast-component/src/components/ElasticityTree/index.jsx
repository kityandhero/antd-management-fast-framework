import { Tree } from 'antd';
import React, { PureComponent } from 'react';

import { isArray, isFunction, transformListData } from 'easy-soft-utility';

class ElasticityTree extends PureComponent {
  render() {
    const {
      onSelect: onSelectCallback = null,
      innerProps: innerProperties = {},
      listData = [],
      dataConvert = null,
    } = {
      onSelect: null,
      innerProps: {},
      listData: [],
      dataConvert: null,
      ...this.props,
    };

    const adjustOtherProperties = {
      showLine: true,
      ...innerProperties,
    };

    const listDataSource = isArray(listData) ? [...listData] : [];

    const listDataAdjust = isFunction(dataConvert)
      ? transformListData({
          list: listDataSource,
          convert: dataConvert,
          recursiveKey: 'children',
        })
      : listDataSource;

    adjustOtherProperties.treeData = [...listDataAdjust];
    adjustOtherProperties.onSelect = (selectedKeys, o) => {
      const { selectedNodes, node } = o;

      if (isFunction(onSelectCallback)) {
        onSelectCallback(selectedKeys, o, {
          selectedNodes,
          node,
          treeData: [...listDataAdjust],
          listData,
        });
      }
    };

    return <Tree {...adjustOtherProperties} />;
  }
}

export { ElasticityTree };
