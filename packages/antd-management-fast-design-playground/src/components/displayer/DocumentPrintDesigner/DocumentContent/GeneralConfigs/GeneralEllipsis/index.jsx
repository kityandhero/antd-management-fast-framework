import { Popover } from 'antd';
import React from 'react';

import { isArray } from 'easy-soft-utility';

import {
  FlexBox,
  iconBuilder,
  IconInfo,
  VerticalBox,
} from 'antd-management-fast-component';

import { GeneralConfigContainer } from '../GeneralConfigContainer';

function GeneralEllipsis(properties) {
  const { items } = properties;

  const itemsAdjust = isArray(items) ? items : [];

  return (
    <GeneralConfigContainer>
      <div style={{ position: 'relative' }}>
        <FlexBox
          flexAuto="left"
          leftStyle={{ height: '30px' }}
          left={<VerticalBox>更多</VerticalBox>}
          right={
            <VerticalBox>
              <IconInfo
                icon={iconBuilder.down()}
                iconStyle={{ color: '#7c7878' }}
              />
            </VerticalBox>
          }
        />

        <Popover
          content={
            itemsAdjust.length <= 0 ? (
              <div>暂无更多配置项目</div>
            ) : (
              <div>{itemsAdjust.map((o) => o)}</div>
            )
          }
          placement="bottomRight"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              zIndex: 100,
              cursor: 'pointer',
            }}
          ></div>
        </Popover>
      </div>
    </GeneralConfigContainer>
  );
}

export { GeneralEllipsis };
