import { Input } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../../bases';
import { Item } from '../Item';

const { TextArea } = Input;

class OnlyShowTextareaItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      value,
      helper = null,
      innerProps: innerProperties = {},
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherInnerProperties = {
      placeholder: `暂无${label}信息`,
      ...innerProperties,
      disabled: true,
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
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
        hidden={hidden}
      >
        <TextArea {...otherInnerProperties} value={value} />
      </Item>
    );
  }
}

OnlyShowTextareaItem.defaultProps = {
  label: '',
  value: '',
  helper: null,
  innerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { OnlyShowTextareaItem };
