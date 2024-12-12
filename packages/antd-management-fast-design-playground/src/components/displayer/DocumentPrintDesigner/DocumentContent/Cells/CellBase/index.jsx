import React, { PureComponent } from 'react';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isString,
  isUndefined,
  toNumber,
  toString,
} from 'easy-soft-utility';

import { CellMarker } from '../../CellMarker';
import {
  colorStyle,
  fontFamilyStyle,
  frontSizeStyle,
  tdPaddingStyle,
} from '../../constant';

class CellBase extends PureComponent {
  getProperties = () => {
    return {
      uniqueTag: '',
      highlighTag: '',
      spanRow: '1',
      spanColumn: '1',
      width: '0',
      data: {},
      designMode: false,
      ...this.props,
    };
  };

  getTdPaddingStyle = () => {
    return tdPaddingStyle;
  };

  buildContentBox = () => {
    const { content } = this.getProperties();

    const contentAdjust = isString(content)
      ? content
      : JSON.stringify(content, null, 2);

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
        {contentAdjust}
      </div>
    );
  };

  render() {
    const {
      uniqueTag,
      highlighTag,
      width,
      data,
      highlightMode,
      designMode,
      spanRow,
      spanColumn,
      onClick: onClickCallback,
      onConfigChange,
    } = this.getProperties();

    let widthAdjust =
      isUndefined(width) ||
      checkStringIsNullOrWhiteSpace(width) ||
      !canToNumber(width)
        ? 0
        : toNumber(width);

    widthAdjust = widthAdjust < 0 ? 0 : widthAdjust;

    let spanRowAdjust =
      isUndefined(spanRow) ||
      checkStringIsNullOrWhiteSpace(spanRow) ||
      !canToNumber(spanRow)
        ? 1
        : toNumber(spanRow);

    spanRowAdjust = spanRowAdjust < 1 ? 1 : toNumber(spanRowAdjust);

    let spanColumnAdjust =
      isUndefined(spanColumn) ||
      checkStringIsNullOrWhiteSpace(spanColumn) ||
      !canToNumber(spanColumn)
        ? 1
        : toNumber(spanColumn);

    spanColumnAdjust = spanColumnAdjust < 1 ? 1 : toNumber(spanColumnAdjust);

    return (
      <td
        style={{
          position: 'relative',
          ...this.getTdPaddingStyle(),
          ...(widthAdjust > 0
            ? {
                width: `${widthAdjust}px`,
              }
            : {}),
        }}
        rowSpan={toString(spanRowAdjust)}
        colSpan={toString(spanColumnAdjust)}
      >
        {designMode ? (
          <CellMarker
            data={data}
            highlight={
              !checkStringIsNullOrWhiteSpace(uniqueTag) &&
              uniqueTag === highlighTag
            }
            highlightMode={highlightMode}
            onConfigChange={(o) => {
              if (!isFunction(onConfigChange)) {
                return;
              }

              onConfigChange(o);
            }}
            onClick={() => {
              if (!isFunction(onClickCallback)) {
                return;
              }

              onClickCallback({ data, uniqueTag, highlightMode });
            }}
          />
        ) : null}

        {this.buildContentBox()}
      </td>
    );
  }
}

export { CellBase };
