import React from 'react';

import { CenterBox, FlexBox } from 'antd-management-fast-component';

import { CellMarker } from '../../CellMarker';
import {
  colorStyle,
  fontFamilyStyle,
  highlightModeCollection,
  labelFrontStyle,
  valueFrontStyle,
} from '../../constant';
import { buildDisplayValue } from '../../tools';

function InLineItem(properties) {
  const {
    data,
    values,
    color,
    currentName,
    highlightMode,
    labelBoxStyle,
    labelContainerStyle,
    valueBoxStyle,
    designMode,
    onClick: onClickCallback,
  } = properties;

  const { title, name } = { ...data };

  const displayValue = buildDisplayValue(data, values);

  const filedComponent = (
    <FlexBox
      flexAuto="right"
      style={{
        height: '100%',
        overflow: 'hidden',
      }}
      leftStyle={{
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderLeft: `1px solid ${color}`,
        borderRight: `1px solid ${color}`,
        textAlign: 'center',
        ...labelFrontStyle,
        ...colorStyle,
        ...fontFamilyStyle,
        ...labelBoxStyle,
        width: 'auto',
      }}
      left={
        <CenterBox>
          <div
            style={{
              paddingLeft: '6px',
              paddingRight: '6px',
              ...labelContainerStyle,
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </div>
        </CenterBox>
      }
      rightStyle={{
        ...valueFrontStyle,
        ...colorStyle,
        ...fontFamilyStyle,
        ...valueBoxStyle,
        borderRight: '0',
      }}
      right={
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                height: '100%',
              }}
            >
              {displayValue}
            </div>
          </div>
        </div>
      }
    />
  );

  if (designMode) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <CellMarker
          data={data}
          highlight={
            currentName === name &&
            highlightMode === highlightModeCollection.value
          }
          highlightMode={highlightModeCollection.value}
          onClick={onClickCallback}
        />

        {filedComponent}
      </div>
    );
  }

  return filedComponent;
}

export { InLineItem };
