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

class OnlyShowInputItem extends BaseComponent {
  ignoreComparePropertyKeyCollection = ['icon'];

  renderFurther() {
    const {
      label,
      value,
      helper = null,
      icon = iconBuilder.form(),
      inputProps: inputProperties = { disabled: true },
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherInputProperties = {
      addonBefore: icon,
      placeholder: '暂无数据',
      value: checkStringIsNullOrWhiteSpace(value || '') ? '' : value,
      ...inputProperties,
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
  inputProps: { disabled: true },
  formItemLayout: {},
  hidden: false,
};

export { OnlyShowInputItem };
