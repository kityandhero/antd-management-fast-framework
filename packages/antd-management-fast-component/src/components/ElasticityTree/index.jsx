import { Tree } from 'antd';
import React from 'react';

import { isArray, isFunction, transformListData } from 'easy-soft-utility';

import { BaseComponent } from '../../bases';

class ElasticityTree extends BaseComponent {
  renderFurther() {
    const {
      onSelect: onSelectCallback = null,
      innerProps: innerProperties = {},
      listData = [],
      dataConvert = null,
    } = this.props;

    const adjustOtherProperties = {
      showLine: true,
      ...innerProperties,
    };

    const listDataSource = isArray(listData) ? listData : [];

    const listDataAdjust = isFunction(dataConvert)
      ? transformListData({
          list: listDataSource,
          convert: dataConvert,
          recursiveKey: 'children',
        })
      : listDataSource;

    adjustOtherProperties.treeData = listDataAdjust;
    adjustOtherProperties.onSelect = (selectedKeys, o) => {
      const { selectedNodes, node } = o;

      if (isFunction(onSelectCallback)) {
        onSelectCallback(selectedKeys, o, {
          selectedNodes,
          node,
          treeData: listDataAdjust,
          listData,
        });
      }
    };

    return <Tree {...adjustOtherProperties} />;
  }
}

ElasticityTree.defaultProps = {
  onSelect: null,
  innerProps: {},
  listData: [],
  dataConvert: null,
};

export { ElasticityTree };
