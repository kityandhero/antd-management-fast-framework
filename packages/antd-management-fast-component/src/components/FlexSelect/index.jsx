import { Select } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  checkStringIsNullOrWhiteSpace,
  filter,
  isFunction,
} from 'easy-soft-utility';

import { BaseComponent } from '../../bases';
import { ColorText } from '../ColorText';
import { FlexBox } from '../FlexBox';
import { buildOptionItem } from '../Function';
import { VerticalBox } from '../VerticalBox';

class FlexSelect extends BaseComponent {
  renderFurther() {
    const {
      style,
      label = '',
      defaultValue = null,
      separator = ':',
      size = 'middle',
      list = [],
      dataConvert = null,
      renderItem = null,
      onChange: onChangeCallback = null,
      innerProps: innerProperties = null,
    } = this.props;

    const listAdjust =
      (dataConvert || null) == null
        ? list
        : list.map((o, index) => {
            return dataConvert(o, index);
          });

    const mergeProperties = {
      placeholder: buildFieldDescription(label, '选择') || '请选择',
      size,
      defaultValue,
      style: { width: '100%' },
      onChange: (v, option) => {
        if (isFunction(onChangeCallback)) {
          const selectList = filter(listAdjust, (one) => {
            const { value } = one;

            return v === value;
          });

          onChangeCallback(
            v,
            selectList.length == 1 ? selectList[0] : selectList,
            option,
          );
        }
      },
      ...innerProperties,
    };

    return (
      <FlexBox
        flexAuto="right"
        style={style}
        left={
          checkStringIsNullOrWhiteSpace(label || '') ? null : (
            <VerticalBox
              align="center"
              alignJustify="start"
              style={{
                height: '100%',
              }}
            >
              <ColorText
                textPrefix={label}
                separator={separator}
                separatorStyle={{ paddingLeft: '4px', paddingRight: '8px' }}
              />
            </VerticalBox>
          )
        }
        right={
          <Select {...mergeProperties}>
            {isFunction(renderItem)
              ? listAdjust.map((o, index) => {
                  return renderItem(o, index);
                })
              : listAdjust.map((o, index) => {
                  return buildOptionItem(o, index);
                })}
          </Select>
        }
      />
    );
  }
}

FlexSelect.defaultProps = {
  label: '',
  defaultValue: null,
  separator: ':',
  size: 'middle',
  list: [],
  dataConvert: null,
  renderItem: null,
  onChange: null,
  innerProps: null,
};

export { FlexSelect };
