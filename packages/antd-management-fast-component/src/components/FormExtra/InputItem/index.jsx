import { Input } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { iconBuilder } from '../../Icon';
import { Item } from '../Item';

class InputItem extends PureComponent {
  render() {
    const {
      label,
      name,
      required,
      helper,
      icon,
      innerProps: innerProperties,
      canOperate,
      formItemLayout,
      reminderPrefix,
      hidden = false,
    } = this.props;

    const title = label;

    const otherInnerProperties = {
      addonBefore: icon,
      placeholder: canOperate
        ? buildFieldDescription(title, reminderPrefix)
        : '暂无数据',
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
        <Input {...otherInnerProperties} />
      </Item>
    );
  }
}

InputItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  icon: iconBuilder.form(),
  innerProps: {},
  canOperate: true,
  formItemLayout: {},
  reminderPrefix: '输入',
  hidden: false,
};

export { InputItem };
