import { InputNumber } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { iconBuilder } from '../../Icon';
import { Item } from '../Item';

class InputNumberItem extends PureComponent {
  render() {
    const {
      label,
      name,
      required = false,
      helper = null,
      icon = iconBuilder.form(),
      innerProps: innerProperties = {},
      canOperate = true,
      formItemLayout = {},
      hidden = true,
    } = this.props;

    const title = label;

    const otherInnerProperties = {
      addonBefore: icon,
      style: { width: '100%' },
      min: 0,
      placeholder: buildFieldDescription(title, '输入'),
      disabled: !canOperate,
      ...innerProperties,
    };

    const resultCheck = checkFromConfig({
      label: title,
      name,
      helper,
    });

    return (
      <Item
        {...formItemLayout}
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
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
        hidden={hidden}
      >
        <InputNumber {...otherInnerProperties} />
      </Item>
    );
  }
}

InputNumberItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  icon: iconBuilder.form(),
  innerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { InputNumberItem };
