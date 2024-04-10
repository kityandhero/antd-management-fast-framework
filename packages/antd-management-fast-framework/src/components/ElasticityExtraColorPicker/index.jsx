import { ColorPicker } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import { switchControlAssist } from '../../utils/switchControlAssist';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ElasticityExtraColorPicker extends PureComponent {
  render() {
    const {
      switchControl,
      flag,
      value,
      disabled,
      onChange: onChangeCallback,
    } = this.props;

    const checkResult = switchControlAssist.check(switchControl, flag);

    return (
      <FlexBox
        flexAuto="right"
        left={<VerticalBox>色值：</VerticalBox>}
        right={
          <div
            style={{
              minWidth: '104px',
            }}
          >
            <VerticalBox>
              <ColorPicker
                value={value}
                allowClear
                showText
                disabled={disabled || checkResult}
                presets={[
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
                ]}
                onChange={(value, hex) => {
                  if (!isFunction(onChangeCallback)) {
                    return;
                  }

                  onChangeCallback(value, hex);
                }}
              />
            </VerticalBox>
          </div>
        }
      />
    );
  }
}

ElasticityExtraColorPicker.defaultProps = {
  flag: '',
  value: '',
  disabled: false,
  onChange: null,
};

export { ElasticityExtraColorPicker };
