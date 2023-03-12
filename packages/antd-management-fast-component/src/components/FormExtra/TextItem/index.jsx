import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../../bases';
import { Item } from '../Item';

class TextItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      value,
      helper = null,
      formItemLayout = null,
      hidden = false,
    } = this.props;

    const resultCheck = checkFromConfig({
      label,
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
        {value}
      </Item>
    );
  }
}

TextItem.defaultProps = {
  label: '',
  value: '',
  helper: null,
  list: [],
  formItemLayout: null,
  hidden: false,
};

export { TextItem };
