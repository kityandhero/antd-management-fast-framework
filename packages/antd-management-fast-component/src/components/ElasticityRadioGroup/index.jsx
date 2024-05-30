import { Radio } from 'antd';
import React from 'react';

import { filter, isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../../bases';
import { buildRadioItem } from '../Function';

class ElasticityRadioGroup extends BaseComponent {
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const {
      value,
      defaultValue,
      style,
      button,
      buttonStyle,
      size = 'middle',
      list = [],
      dataConvert = null,
      renderItem,
      onChange: onChangeCallback = null,
    } = this.props;

    const listMerge = list.map((o) => {
      return { ...o, button: !!button };
    });

    const listAdjust =
      (dataConvert || null) == null
        ? listMerge
        : listMerge.map((o, index) => {
            return dataConvert(o, index);
          });

    const mergeProperties = {
      defaultValue,
      size,
      buttonStyle,
      style,
      onChange: (event) => {
        if (isFunction(onChangeCallback)) {
          const {
            target: { value: v },
          } = event;

          const selectList = filter(listAdjust, (one) => {
            const { value } = one;

            return v === value;
          });

          onChangeCallback(
            v,
            selectList.length == 1 ? selectList[0] : selectList,
            event,
          );
        }
      },
      ...((value || null) == null ? {} : { value }),
    };

    return (
      <Radio.Group {...mergeProperties}>
        {isFunction(renderItem)
          ? listAdjust.map((o, index) => {
              return renderItem(o, index);
            })
          : listAdjust.map((o, index) => {
              return buildRadioItem({ ...o, button: !!button }, index);
            })}
      </Radio.Group>
    );
  }
}

ElasticityRadioGroup.defaultProps = {
  value: null,
  defaultValue: null,
  style: null,
  button: false,
  size: 'middle',
  buttonStyle: null,
  list: [],
  dataConvert: null,
  renderItem: null,
  onChange: null,
};

export { ElasticityRadioGroup };
