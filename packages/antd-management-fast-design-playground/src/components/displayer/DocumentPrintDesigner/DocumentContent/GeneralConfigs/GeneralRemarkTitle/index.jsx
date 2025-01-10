import { Input } from 'antd';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import { adjustGeneralConfig } from '../../tools';
import { GeneralExtraConfigBoxContainer } from '../GeneralExtraConfigBoxContainer';

function GeneralRemarkTitle(properties) {
  const {
    showDivider,
    data,
    onChange: onChangeCallback,
  } = {
    showDivider: true,
    ...properties,
  };

  const { remarkTitle } = adjustGeneralConfig(data);

  return (
    <>
      <GeneralExtraConfigBoxContainer showDivider={showDivider}>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>备注栏标题：</VerticalBox>}
          right={
            <Input
              placeholder="请输入标题, 默认名为“备注”"
              value={remarkTitle}
              onChange={(event) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                const { value: v } = event.target;

                onChangeCallback({
                  ...data,
                  remarkTitle: v,
                });
              }}
            />
          }
        />
      </GeneralExtraConfigBoxContainer>
    </>
  );
}

export { GeneralRemarkTitle };
