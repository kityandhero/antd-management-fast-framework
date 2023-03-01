import { Radio } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
  isFunction,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { Item } from '../Item';

const { Group: RadioGroup } = Radio;

class RadioItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      name,
      helper = null,
      list = [],
      dataConvert = null,
      renderItem,
      onChangeCallback = null,
      formItemLayout = null,
      required = false,
      otherProps: otherProperties = null,
      hidden = false,
    } = this.props;

    const listAdjust =
      (dataConvert || null) == null
        ? list
        : list.map((o) => {
            return dataConvert(o);
          });

    const otherRadioProperties = {
      placeholder: buildFieldDescription(label, '选择'),
      style: { width: '100%' },
      onChange: (event) => {
        if (isFunction(onChangeCallback)) {
          onChangeCallback(event);
        }
      },
      ...otherProperties,
      ...(isFunction(renderItem)
        ? {}
        : {
            options: listAdjust,
          }),
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
        <RadioGroup {...otherRadioProperties}>
          {isFunction(renderItem)
            ? listAdjust.map((o, index) => {
                return renderItem(o, index);
              })
            : null}
        </RadioGroup>
      </Item>
    );
  }
}

RadioItem.defaultProps = {
  label: '',
  name: '',
  helper: null,
  list: [],
  dataConvert: null,
  renderItem: null,
  onChangeCallback: null,
  formItemLayout: null,
  required: false,
  otherProps: null,
  hidden: false,
};

export { RadioItem };
