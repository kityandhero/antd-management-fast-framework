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

class OnlyShowInputItem extends PureComponent {
  render() {
    const {
      label,
      value,
      helper = null,
      icon = iconBuilder.form(),
      innerProps: innerProperties = { disabled: true },
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherInputProperties = {
      addonBefore: icon,
      placeholder: '暂无数据',
      value: checkStringIsNullOrWhiteSpace(value || '') ? '' : value,
      ...innerProperties,
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <Item
        {...formItemLayout}
        label={resultCheck.label}
        extra={
          checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
        hidden={hidden}
      >
        <Input {...otherInputProperties} />
      </Item>
    );
  }
}

OnlyShowInputItem.defaultProps = {
  label: '',
  value: '',
  helper: null,
  icon: iconBuilder.form(),
  innerProps: { disabled: true },
  formItemLayout: {},
  hidden: false,
};

export { OnlyShowInputItem };
