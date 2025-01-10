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

function GeneralSerialNumberSwitch(properties) {
  const {
    showDivider,
    data,
    onChange: onChangeCallback,
  } = {
    showDivider: true,
    ...properties,
  };

  const { serialNumberSwitch } = adjustGeneralConfig(data);

  const serialNumberSwitchJudge =
    !isUndefined(serialNumberSwitch) &&
    !checkStringIsNullOrWhiteSpace(serialNumberSwitch) &&
    toString(serialNumberSwitch) === whetherString.yes;

  return (
    <>
      <GeneralExtraConfigBoxContainer showDivider={showDivider}>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>流水号开关：</VerticalBox>}
          right={
            <Switch
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              checked={serialNumberSwitchJudge}
              onChange={(checked) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  serialNumberSwitch: checked
                    ? whetherString.yes
                    : whetherString.no,
                });
              }}
            />
          }
        />
      </GeneralExtraConfigBoxContainer>
    </>
  );
}

export { GeneralSerialNumberSwitch };
