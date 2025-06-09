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

class OnlyShowTextareaItem extends PureComponent {
  render() {
    const {
      label,
      value,
      helper = null,
      innerProps: innerProperties = {},
      formItemLayout = {},
      hidden = false,
      addonBefore = null,
      addonBeforeStyle = null,
      addonAfter = null,
      addonAfterStyle = null,
      actionBar = null,
    } = this.props;

    const title = label;

    const otherInnerProperties = {
      placeholder: `暂无${label}信息`,
      ...innerProperties,
      disabled: true,
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '697c2611138d40719e1e4d933f31ae9f',
      helper,
    });

    return (
      <Item
        {...formItemLayout}
        label={resultCheck.label}
        // name={resultCheck.name}
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
        <div
          style={{
            position: 'relative',
          }}
        >
          <TextArea {...otherInnerProperties} value={value} />

          <div
            style={{
              position: 'absolute',
              right: '6px',
              bottom: '3px',
              zIndex: '1',
            }}
          >
            {actionBar}
          </div>
        </div>
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
  addonBefore: null,
  addonBeforeStyle: null,
  addonAfter: null,
  addonAfterStyle: null,
};

export { OnlyShowTextareaItem };
