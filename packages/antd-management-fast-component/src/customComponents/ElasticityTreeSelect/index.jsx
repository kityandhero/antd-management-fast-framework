import { TreeSelect } from 'antd';
import React from 'react';

import { isArray, isFunction, transformListData } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

class ElasticityTreeSelect extends BaseComponent {
  renderFurther() {
    const {
      value: v,
      placeholder = '',
      onChange: onChangeCallback = null,
      innerProps: innerProperties = {},
      listData = [],
      dataConvert = null,
    } = this.props;

    const adjustOtherProperties = {
      style: { width: '100%' },
      showSearch: true,
      allowClear: true,
      treeLine: true,
      placeholder,
      ...innerProperties,

      value: v || null,
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
    adjustOtherProperties.onChange = (value, label, extra) => {
      if (isFunction(onChangeCallback)) {
        onChangeCallback({
          value,
          label,
          extra,
          treeData: listDataAdjust,
          listData,
        });
      }
    };

    return <TreeSelect {...adjustOtherProperties} />;
  }
}

ElasticityTreeSelect.defaultProps = {
  value: null,
  placeholder: '',
  onChangeCallback: null,
  innerProps: {},
  listData: [],
  dataConvert: null,
};

export { ElasticityTreeSelect };
