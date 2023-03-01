import { Input } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { Item } from '../Item';

const { TextArea } = Input;

class TextAreaItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      name,
      required = false,
      helper = null,
      textAreaProps: textAreaProperties = {},
      canOperate = true,
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherTextAreaProperties = {
      placeholder: buildFieldDescription(title, '输入'),
      disabled: !canOperate,
      ...textAreaProperties,
    };

    const resultCheck = checkFromConfig({
      label: title,
      name,
      helper,
    });

    if (!canOperate) {
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
          <TextArea {...otherTextAreaProperties} />
        </Item>
      );
    }

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
        <TextArea {...otherTextAreaProperties} />
      </Item>
    );
  }
}

TextAreaItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  textAreaProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { TextAreaItem };
