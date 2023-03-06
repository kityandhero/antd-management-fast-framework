import { Select } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
  filter,
  isFunction,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { buildOptionItem } from '../../Function';
import { Item } from '../Item';

class SelectItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      name,
      helper = null,
      list = [],
      dataConvert = null,
      renderItem,
      onChange: onChangeCallback = null,
      formItemLayout = null,
      required = false,
      innerProps: innerProperties = null,
      hidden = false,
    } = this.props;

    const listAdjust =
      (dataConvert || null) == null
        ? list
        : list.map((o, index) => {
            return dataConvert(o, index);
          });

    const otherSelectProperties = {
      placeholder: buildFieldDescription(label, '选择') || '请选择',
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

    const resultCheck = checkFromConfig({
      label,
      name,
      helper,
    });

    return (
      <Item
        {...(formItemLayout || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label, '选择'),
          },
        ]}
        hidden={hidden}
      >
        <Select {...otherSelectProperties}>
          {isFunction(renderItem)
            ? listAdjust.map((o, index) => {
                return renderItem(o, index);
              })
            : listAdjust.map((o, index) => {
                return buildOptionItem(o, index);
              })}
        </Select>
      </Item>
    );
  }
}

SelectItem.defaultProps = {
  label: '',
  name: '',
  helper: null,
  list: [],
  dataConvert: null,
  renderItem: null,
  onChange: null,
  formItemLayout: null,
  required: false,
  innerProps: null,
  hidden: false,
};

export { SelectItem };
