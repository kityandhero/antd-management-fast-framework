import React from 'react';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  toNumber,
} from 'easy-soft-utility';

import { tdPaddingStyle } from '../../constant';
import { CellBase } from '../CellBase';

const tdStyle = {
  textAlign: 'center',
  padding: '10px 0px',
};

function buildCellList(data, tdConfigList) {
  if (!isArray(tdConfigList) || isEmptyArray(tdConfigList)) {
    return [];
  }

  const valueList = tdConfigList.map((o) => {
    const { name = '', width = 0, align = 'left' } = o;

    const widthStyle = canToNumber(width)
      ? toNumber(width) > 0
        ? { width: `${toNumber(width)}px` }
        : {}
      : {};

    const textAlignStyle = { textAlign: align };

    if (checkStringIsNullOrWhiteSpace(name)) {
      return '';
    }

    return {
      value: data[o.name] || '',
      style: {
        ...textAlignStyle,
        ...widthStyle,
      },
    };
  });

  return valueList;
}

function buildRowList(list, tdConfigList, { rowCount, border, borderColor }) {
  const emptyData = {};

  for (const item of tdConfigList) {
    const { name } = item;

    if (checkStringIsNullOrWhiteSpace(name)) {
      continue;
    }

    emptyData[name] = '无数据';
  }

  const listAdjust = !isArray(list) || isEmptyArray(list) ? [emptyData] : list;

  const trList = listAdjust.map((o, index) => {
    return (
      <tr key={`tr_${index}`}>
        {buildCellList(o, tdConfigList).map((one, index_) => {
          const { value, style } = one;

          return (
            <td
              key={`td_${index_}`}
              style={{
                ...tdStyle,
                ...style,
                ...(index === rowCount - 1
                  ? {
                      borderBottom: `0px solid ${borderColor}`,
                    }
                  : {
                      borderBottom: `${border}px solid ${borderColor}`,
                    }),
                ...(index_ === tdConfigList.length - 1
                  ? {
                      borderRight: `0px solid ${borderColor}`,
                    }
                  : {
                      borderRight: `${border}px solid ${borderColor}`,
                    }),
              }}
            >
              {value}
            </td>
          );
        })}
      </tr>
    );
  });

  return trList;
}

class CellTable extends CellBase {
  getTdPaddingStyle = () => {
    return {
      ...tdPaddingStyle,
      padding: 0,
    };
  };

  buildContentBox = () => {
    const {
      data: {
        extraData: { items = [] },
      },
      textAlign,
      textColor,
      border,
      borderColor,
      content,
    } = this.getProperties();

    let list = [];

    try {
      const listSource = JSON.parse(content);

      list = isArray(listSource) ? listSource : [];
    } catch {
      // ignored
    }

    const itemsAdjust = isArray(items) ? items : [];

    const emptyData = {};

    for (const item of itemsAdjust) {
      const { name } = item;

      if (checkStringIsNullOrWhiteSpace(name)) {
        continue;
      }

      emptyData[name] = '无数据';
    }

    const listAdjust =
      !isArray(list) || isEmptyArray(list) ? [emptyData] : list;

    const rowCount = listAdjust.length;
    const columnCount = itemsAdjust.length;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          textAlign: textAlign,
          color: textColor,
          borderRight: '0',
        }}
      >
        <table
          style={{
            width: '100%',
            borderWidth: 0,
          }}
        >
          <thead>
            <tr>
              {itemsAdjust.map((o, index) => {
                const { title = '', width = 0, align = 'left' } = o;

                const widthStyle = canToNumber(width)
                  ? toNumber(width) > 0
                    ? { width: `${toNumber(width)}px` }
                    : {}
                  : {};

                const textAlignStyle = { textAlign: align };

                return (
                  <th
                    key={`th_${index}`}
                    style={{
                      ...tdStyle,
                      ...widthStyle,
                      ...textAlignStyle,
                      ...(rowCount > 0
                        ? {
                            borderBottom: `${border}px solid ${borderColor}`,
                          }
                        : {
                            borderBottom: `0px solid ${borderColor}`,
                          }),
                      ...(index === columnCount - 1
                        ? {
                            borderRight: `0px solid ${borderColor}`,
                          }
                        : {
                            borderRight: `${border}px solid ${borderColor}`,
                          }),
                    }}
                  >
                    {title || ''}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {buildRowList(listAdjust, itemsAdjust, {
              rowCount,
              border,
              borderColor,
            })}
          </tbody>
        </table>
      </div>
    );
  };
}

export { CellTable };
