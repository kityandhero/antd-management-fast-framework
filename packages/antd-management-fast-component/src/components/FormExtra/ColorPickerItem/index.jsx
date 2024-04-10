import { ColorPicker } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
  isFunction,
} from 'easy-soft-utility';

import { Item } from '../Item';

class ColorPickerItem extends PureComponent {
  render() {
    const {
      label,
      name,
      required = false,
      helper = null,
      innerProps: innerProperties = {},
      canOperate = true,
      onChange: onChangeCallback = null,
      formItemLayout = {},
      hidden = false,
      addonBefore = null,
      addonBeforeStyle = null,
      addonAfter = null,
      addonAfterStyle = null,
    } = this.props;

    const title = label;

    const otherInnerProperties = {
      allowClear: true,
      showText: true,
      style: { width: '100%', justifyContent: 'flex-start' },
      presets: [
        {
          label: '常用',
          colors: [
            '#000000',
            '#000000E0',
            '#000000A6',
            '#00000073',
            '#00000040',
            '#00000026',
            '#0000001A',
            '#00000012',
            '#0000000A',
            '#00000005',
            '#F5222D',
            '#FA8C16',
            '#FADB14',
            '#8BBB11',
            '#52C41A',
            '#13A8A8',
            '#1677FF',
            '#2F54EB',
            '#722ED1',
            '#EB2F96',
            '#F5222D4D',
            '#FA8C164D',
            '#FADB144D',
            '#8BBB114D',
            '#52C41A4D',
            '#13A8A84D',
            '#1677FF4D',
            '#2F54EB4D',
            '#722ED14D',
            '#EB2F964D',
          ],
        },
      ],
      disabled: !canOperate,
      onChange: (value, hex) => {
        if (isFunction(onChangeCallback)) {
          onChangeCallback(value, hex);
        }
      },
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
        addonBefore={addonBefore}
        addonBeforeStyle={addonBeforeStyle}
        addonAfter={addonAfter}
        addonAfterStyle={addonAfterStyle}
      >
        <ColorPicker {...otherInnerProperties} />
      </Item>
    );
  }
}

ColorPickerItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  innerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
  addonBefore: null,
  addonBeforeStyle: null,
  addonAfter: null,
  addonAfterStyle: null,
  onChange: null,
};

export { ColorPickerItem };
