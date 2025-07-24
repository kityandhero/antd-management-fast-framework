import React from 'react';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  formatMoneyToChinese,
  toNumber,
} from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import {
  colorStyle,
  currencyDisplayStyle,
  fontFamilyStyle,
  frontSizeStyle,
} from '../../constant';
import { CellBase } from '../CellBase';

class CellMoney extends CellBase {
  buildContentBox = () => {
    const { content } = this.getProperties();

    let whetherZero = false;
    let contentAdjust = '';

    if (checkStringIsNullOrWhiteSpace(content)) {
      whetherZero = true;
      contentAdjust = 0;
    } else {
      contentAdjust = content;
    }

    if (!canToNumber(contentAdjust)) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            ...frontSizeStyle,
            ...colorStyle,
            ...fontFamilyStyle,
            textAlign: 'center',
            borderRight: '0',
          }}
        >
          {`"${contentAdjust}" 不能转化为货币形式`}
        </div>
      );
    }

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          ...frontSizeStyle,
          ...colorStyle,
          ...fontFamilyStyle,
          textAlign: 'center',
          borderRight: '0',
        }}
      >
        <FlexBox
          flexAuto="left"
          style={{
            width: '100%',
            height: '100%',
          }}
          left={
            <VerticalBox>
              <div
                style={{
                  ...frontSizeStyle,
                  fontSize: '16px',
                  ...fontFamilyStyle,
                  ...colorStyle,
                }}
              >
                人民币（大写）
                <span style={currencyDisplayStyle}>
                  {formatMoneyToChinese({
                    target: whetherZero ? 0 : toNumber(contentAdjust),
                  })}
                </span>
              </div>
            </VerticalBox>
          }
          right={
            <VerticalBox>
              <div
                style={{
                  ...frontSizeStyle,
                  fontSize: '20px',
                  fontWeight: 'bold',
                  ...fontFamilyStyle,
                  ...colorStyle,
                }}
              >
                小写￥<span style={currencyDisplayStyle}>{contentAdjust}</span>
              </div>
            </VerticalBox>
          }
        />
      </div>
    );
  };
}

export { CellMoney };
