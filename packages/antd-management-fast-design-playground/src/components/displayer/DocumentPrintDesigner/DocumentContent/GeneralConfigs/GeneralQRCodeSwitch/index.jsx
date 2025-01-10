import { Switch } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isUndefined,
  toString,
  whetherString,
} from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import { adjustGeneralConfig } from '../../tools';
import { GeneralExtraConfigBoxContainer } from '../GeneralExtraConfigBoxContainer';

function GeneralQRCodeSwitch(properties) {
  const {
    showDivider,
    data,
    onChange: onChangeCallback,
  } = {
    showDivider: true,
    ...properties,
  };

  const { qRCodeSwitch } = adjustGeneralConfig(data);

  const qRCodeSwitchJudge =
    !isUndefined(qRCodeSwitch) &&
    !checkStringIsNullOrWhiteSpace(qRCodeSwitch) &&
    toString(qRCodeSwitch) === whetherString.yes;

  return (
    <>
      <GeneralExtraConfigBoxContainer showDivider={showDivider}>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>二维码开关：</VerticalBox>}
          right={
            <Switch
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              checked={qRCodeSwitchJudge}
              onChange={(checked) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  qRCodeSwitch: checked ? whetherString.yes : whetherString.no,
                });
              }}
            />
          }
        />
      </GeneralExtraConfigBoxContainer>
    </>
  );
}

export { GeneralQRCodeSwitch };
