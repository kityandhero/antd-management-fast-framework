import { Input } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { Item } from '../Item';

const { TextArea } = Input;

class TextAreaItem extends PureComponent {
  render() {
    const {
      label,
      name,
      required = false,
      helper = null,
      innerProps: innerProperties = {},
      canOperate = true,
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherInnerProperties = {
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
        <TextArea {...otherInnerProperties} />
      </Item>
    );
  }
}

TextAreaItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  innerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { TextAreaItem };
