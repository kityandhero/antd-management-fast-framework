import { Input } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { iconBuilder } from '../../Icon';
import { Item } from '../Item';

const { Password } = Input;

class PasswordItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      name,
      helper,
      icon,
      formItemLayout,
      required,
      innerProps: innerProperties,
      hidden = false,
    } = this.props;

    const otherInnerProperties = {
      addonBefore: icon,
      placeholder: buildFieldDescription(label, '输入'),
      ...innerProperties,
    };

    const resultCheck = checkFromConfig({
      label,
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
        <Password {...otherInnerProperties} />
      </Item>
    );
  }
}

PasswordItem.defaultProps = {
  label: '',
  name: '',
  helper: null,
  required: false,
  icon: iconBuilder.form(),
  innerProps: {},
  formItemLayout: {},
  hidden: false,
};

export { PasswordItem };
