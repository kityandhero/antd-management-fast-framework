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

function GeneralTitleSwitch(properties) {
  const {
    showDivider,
    data,
    onChange: onChangeCallback,
  } = {
    showDivider: true,
    ...properties,
  };

  const { titleSwitch } = adjustGeneralConfig(data);

  const titleSwitchJudge =
    !isUndefined(titleSwitch) &&
    !checkStringIsNullOrWhiteSpace(titleSwitch) &&
    toString(titleSwitch) === whetherString.yes;

  return (
    <>
      <GeneralExtraConfigBoxContainer showDivider={showDivider}>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>标题开关：</VerticalBox>}
          right={
            <Switch
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              checked={titleSwitchJudge}
              onChange={(checked) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  titleSwitch: checked ? whetherString.yes : whetherString.no,
                });
              }}
            />
          }
        />
      </GeneralExtraConfigBoxContainer>
    </>
  );
}

export { GeneralTitleSwitch };
