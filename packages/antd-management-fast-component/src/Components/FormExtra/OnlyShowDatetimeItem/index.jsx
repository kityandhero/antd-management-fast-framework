import { Input } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../../bases';
import { iconBuilder } from '../../Icon';
import { Item } from '../Item';

class OnlyShowDatetimeItem extends BaseComponent {
  renderFurther() {
    const { label, name, helper, formItemLayout } = this.props;

    const {
      label: labelChanged,
      helper: helperChanged,
      formItemLayout: formItemLayoutChanged,
    } = {
      helper: helper || '时间',
      label: label || '',
      formItemLayout: formItemLayout || null,
    };

    const resultCheck = checkFromConfig({
      label: labelChanged || '时间',
      name,
      helper: helperChanged,
    });

    return (
      <Item
        {...(formItemLayoutChanged || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input
          addonBefore={iconBuilder.form()}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
      </Item>
    );
  }
}

OnlyShowDatetimeItem.defaultProps = {
  label: '时间',
  name: '',
  helper: '',
  formItemLayout: null,
};

export { OnlyShowDatetimeItem };
