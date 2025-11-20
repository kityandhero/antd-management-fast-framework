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
      required = false,
      addonBefore = null,
      addonBeforeStyle = null,
      addonAfter = null,
      addonAfterStyle = null,
    } = this.props;

    const title = label;

    const otherInputProperties = {
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
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
        hidden={hidden}
        icon={icon}
        addonBefore={addonBefore}
        addonBeforeStyle={addonBeforeStyle}
        addonAfter={addonAfter}
        addonAfterStyle={addonAfterStyle}
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
  required: false,
  addonBefore: null,
  addonBeforeStyle: null,
  addonAfter: null,
  addonAfterStyle: null,
};

export { OnlyShowInputItem };
