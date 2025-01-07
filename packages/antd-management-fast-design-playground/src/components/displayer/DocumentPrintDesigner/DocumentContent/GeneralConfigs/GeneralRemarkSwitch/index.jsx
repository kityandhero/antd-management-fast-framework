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

function GeneralRemarkSwitch(properties) {
  const {
    showDivider,
    data,
    onChange: onChangeCallback,
  } = {
    showDivider: true,
    ...properties,
  };

  const { remarkSwitch } = adjustGeneralConfig(data);

  const remarkSwitchJudge =
    !isUndefined(remarkSwitch) &&
    !checkStringIsNullOrWhiteSpace(remarkSwitch) &&
    toString(remarkSwitch) === whetherString.yes;

  return (
    <>
      <GeneralExtraConfigBoxContainer showDivider={showDivider}>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>表单备注栏：</VerticalBox>}
          right={
            <Switch
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              checked={remarkSwitchJudge}
              onChange={(checked) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  remarkSwitch: checked ? whetherString.yes : whetherString.no,
                });
              }}
            />
          }
        />
      </GeneralExtraConfigBoxContainer>
    </>
  );
}

export { GeneralRemarkSwitch };
