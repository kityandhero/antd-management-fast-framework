import { Select } from 'antd';
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

class SelectItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      name,
      renderItemFunction,
      helper = null,
      onChangeCallback = null,
      formItemLayout = null,
      required = false,
      otherProps: otherProperties = null,
      hidden = false,
    } = this.props;

    const otherSelectProperties = {
      placeholder: buildFieldDescription(label, '选择') || '请选择',
      style: { width: '100%' },
      onChange: (v, option) => {
        if (isFunction(onChangeCallback)) {
          onChangeCallback(v, option);
        }
      },
      ...otherProperties,
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
          {isFunction(renderItemFunction) ? renderItemFunction() : null}
        </Select>
      </Item>
    );
  }
}

SelectItem.defaultProps = {
  label: '',
  name: '',
  renderItemFunction: null,
  helper: null,
  onChangeCallback: null,
  formItemLayout: null,
  required: false,
  otherProps: null,
  hidden: false,
};

export { SelectItem };
