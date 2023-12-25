import { Input } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
} from 'easy-soft-utility';

import { iconBuilder } from '../../Icon';
import { Item } from '../Item';

class NowTimeItem extends PureComponent {
  render() {
    const {
      label,
      helper,
      formItemLayout,
      hidden = false,
      addonBefore = null,
      addonBeforeStyle = null,
      addonAfter = null,
      addonAfterStyle = null,
    } = this.props;

    const {
      label: labelChanged,
      helper: helperChanged,
      formItemLayout: formItemLayoutChanged,
    } = {
      helper: helper || '操作的当前时间',
      label: label || '添加时间',
      formItemLayout: formItemLayout || null,
    };

    const resultCheck = checkFromConfig({
      label: labelChanged || '当前时间',
      name: '32',
      helper: helperChanged,
    });

    return (
      <Item
        {...(formItemLayoutChanged || {})}
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
        addonBefore={addonBefore}
        addonBeforeStyle={addonBeforeStyle}
        addonAfter={addonAfter}
        addonAfterStyle={addonAfterStyle}
      >
        <Input
          value={formatDatetime({
            data: new Date(),
            format: datetimeFormat.yearMonthDayHourMinute,
          })}
          addonBefore={iconBuilder.form()}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
      </Item>
    );
  }
}

NowTimeItem.defaultProps = {
  label: '当前时间',
  helper: '操作的当前时间',
  formItemLayout: null,
  addonAfter: null,
  addonAfterStyle: null,
};

export { NowTimeItem };
