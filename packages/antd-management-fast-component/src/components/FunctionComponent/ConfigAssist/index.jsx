import React from 'react';

import { isArray, isBoolean, isFunction, isUndefined } from 'easy-soft-utility';

import { listViewConfig } from 'antd-management-fast-common';

import { FadeBox, QueueBox, RotateBox } from '../../AnimalBox';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';

export function buildIconInfoList({ list = [] }) {
  if (!isArray(list)) {
    return [];
  }

  if (list.length === 0) {
    return [];
  }

  const l = [];

  for (const [index, o] of list.entries()) {
    const { hidden, ...other } = {
      ...IconInfo.defaultProps,
      ...o,

      key: `icon_info_item_${index}`,
    };

    if (!hidden) {
      l.push({
        ...other,
      });
    }
  }

  if (l.length <= 0) {
    return [];
  }

  return l.map((o) => {
    const { key, ...other } = o;

    return <IconInfo key={key} {...other} />;
  });
}

export function adjustTableExpandConfig({ list, config }) {
  if ((config || null) != null) {
    const {
      checkNeedExpander,
      rowExpandable,
      expandPlaceholderIcon,
      expanderStyle,
      animalType: expandAnimalType,
      expandIconRotate,
      expandIcon: expandIconCustom,
      expandedRowRender: expandedRowRenderCustom,
    } = {
      // 判断当前列表数据，如若列表所有数据都不需要显示展开按钮，则忽略其他配置
      checkNeedExpander: null,
      rowExpandable: false,
      expandPlaceholderIcon: iconBuilder.borderOuter({
        style: {
          color: '#ccc',
        },
      }),
      expanderStyle: null,
      animalType: listViewConfig.expandAnimalType.none,
      expandIconRotate: true,
      // eslint-disable-next-line no-unused-vars
      expandIcon: ({ expanded, onExpand, record }) => {
        return iconBuilder.rightCircle({ style: { cursor: 'pointer' } });
      },
      expandedRowRender: null,
      ...(config || null),
    };

    let checkNeedExpanderResult = true;

    if (isBoolean(checkNeedExpander)) {
      checkNeedExpanderResult = checkNeedExpander;
    }

    if (isFunction(checkNeedExpander)) {
      const r = checkNeedExpander(list);

      if (isBoolean(checkNeedExpander)) {
        checkNeedExpanderResult = r;
      }
    }

    const expandableConfig = checkNeedExpanderResult
      ? {
          rowExpandable,
          expandIcon: (p) => {
            const { expandable: canExpand, expanded, onExpand, record } = p;

            if (!canExpand) {
              if (isUndefined(canExpand)) {
                return null;
              }

              if ((expandPlaceholderIcon || null) == null) {
                return null;
              }

              return expandPlaceholderIcon;
            }

            if (expandIconRotate) {
              return (
                <RotateBox
                  rotate={expanded ? 90 : 0}
                  duration={200}
                  onClick={(event) => onExpand(record, event)}
                >
                  {expandIconCustom({ expanded, onExpand, record })}
                </RotateBox>
              );
            }

            return expandIconCustom({ expanded, onExpand, record });
          },
          expandedRowRender: isFunction(expandedRowRenderCustom)
            ? (record, index, indent, expanded) => {
                let child = expandedRowRenderCustom(
                  record,
                  index,
                  indent,
                  expanded,
                );

                if (expandAnimalType === listViewConfig.expandAnimalType.fade) {
                  child = <FadeBox visible={expanded}>{child}</FadeBox>;
                }

                if (
                  expandAnimalType === listViewConfig.expandAnimalType.queue
                ) {
                  child = <QueueBox show={expanded}>{child}</QueueBox>;
                }

                return <div style={expanderStyle || {}}>{child}</div>;
              }
            : null,
        }
      : {};

    return expandableConfig;
  }

  return null;
}
