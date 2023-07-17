import { Switch } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { FlexBox } from '../../FlexBox';
import { Item } from '../Item';

class SwitchItem extends PureComponent {
  render() {
    const {
      label,
      name,
      checked = false,
      required = false,
      helper = null,
      innerProps: innerProperties = {},
      canOperate = true,
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherSwitchProperties = {
      disabled: !canOperate,
      checked,
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
        valuePropName="checked"
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
        render={(children) => (
          <FlexBox
            flexAuto="left"
            left={`是否开启${label}: `}
            right={children}
          />
        )}
        hidden={hidden}
      >
        <Switch {...otherSwitchProperties} />
      </Item>
    );
  }
}

SwitchItem.defaultProps = {
  label: '',
  name: '',
  checked: false,
  required: false,
  helper: null,
  innerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { SwitchItem };
