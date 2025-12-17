import { Divider } from 'antd';
import classNames from 'classnames';
import React from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  distinctAdjacent,
  filter,
  getGuid,
  isArray,
  isFunction,
  logObject,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { dropdownExpandItemType } from 'antd-management-fast-common';

import { BaseComponent } from '../../bases';
import { ElasticityButton } from '../ElasticityButton';
import { iconBuilder } from '../Icon';

import './index.less';

class ElasticityMenu extends BaseComponent {
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const { handleData: r, items, handleMenuClick } = this.props;

    if (!isFunction(handleMenuClick)) {
      throw new Error('buildMenu : handleMenuClick must be function');
    }

    if (!isArray(items)) {
      throw new Error('buildMenu : items must be array');
    }

    const itemsFiltered = filter(items, (one) => {
      const { hidden } = {
        hidden: false,
        ...one,
      };

      return !!hidden != true;
    });

    const itemsAdjust = distinctAdjacent(itemsFiltered, (o) => {
      const { type } = {
        type: dropdownExpandItemType.item,
        ...o,
      };

      return type === dropdownExpandItemType.divider;
    });

    let listItem = [];
    let previousItem = null;

    for (const o of itemsAdjust || []) {
      const d = {
        withDivider: false,
        uponDivider: true,
        key: getGuid(),
        icon: iconBuilder.edit(),
        text: '',
        disabled: false,
        hidden: false,
        type: dropdownExpandItemType.item,
        color: null,
        confirm: false,
        ...o,
      };

      const { key, disabled, hidden, withDivider, type, uponDivider } = d;

      if (checkStringIsNullOrWhiteSpace(key)) {
        logObject(d);

        showSimpleErrorMessage('key is not allow empty');
      }

      if (
        checkInCollection(
          [dropdownExpandItemType.divider, dropdownExpandItemType.item],
          type,
        )
      ) {
        const { type: previousItemType = '' } = {
          type: '',
          ...previousItem,
        };

        if (withDivider && type === dropdownExpandItemType.item) {
          const divider = {
            key: getGuid(),
            icon: null,
            text: '',
            disabled,
            hidden,
            type: dropdownExpandItemType.divider,
          };

          if (
            uponDivider &&
            previousItemType !== dropdownExpandItemType.divider
          ) {
            listItem.push(divider);
          }

          listItem.push(d);

          if (
            !uponDivider &&
            previousItemType !== dropdownExpandItemType.divider
          ) {
            listItem.push(divider);

            previousItem = divider;
          } else {
            previousItem = d;
          }
        } else {
          if (type === dropdownExpandItemType.item) {
            listItem.push(d);

            previousItem = d;
          }

          if (
            type === dropdownExpandItemType.divider &&
            previousItemType !== dropdownExpandItemType.divider
          ) {
            listItem.push(d);

            previousItem = d;
          }
        }
      }
    }

    if (listItem.length > 0) {
      const firstItem = listItem[0];

      const { type: firstItemType = '' } = {
        type: '',
        ...firstItem,
      };

      if (firstItemType === dropdownExpandItemType.divider) {
        listItem.shift();
      }
    }

    if (listItem.length > 0) {
      const lastItem = listItem.at(-1);

      const { type: lastItemType = '' } = {
        type: '',
        ...lastItem,
      };

      if (lastItemType === dropdownExpandItemType.divider) {
        listItem.pop();
      }
    }

    return (
      <div className={classNames('amf-dropdownExpandItemCustom')}>
        <div
          style={{
            height: '4px',
          }}
        />

        {listItem.map((o) => {
          const {
            title,
            placement,
            confirmZIndex,
            okText,
            cancelText,
            type,
            key,
            icon,
            text,
            disabled,
            hidden,
            confirm,
            color,
          } = {
            confirm: false,
            title: '',
            placement: 'topRight',
            confirmZIndex: null,
            className: '',
            okText: '确定',
            cancelText: '取消',
            overlayStyle: {},
            ...o,
          };

          if (checkStringIsNullOrWhiteSpace(key)) {
            showSimpleErrorMessage('key is not allow empty');
          }

          if (hidden) {
            return null;
          }

          if (type === dropdownExpandItemType.item) {
            return (
              <ElasticityButton
                key={key}
                confirm={confirm}
                confirmPanelZIndex={confirmZIndex}
                placement={placement}
                title={title}
                okText={okText}
                cancelText={cancelText}
                overlayStyle={{ zIndex: 1060 }}
                disabled={disabled ?? false}
                type="text"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '5px 12px',
                  border: 0,
                  height: '32px',
                }}
                size="small"
                className={classNames('amf-dropdownExpandItemCustom_button')}
                icon={icon || iconBuilder.edit()}
                text={text || ''}
                handleClick={() => {
                  if (isFunction(handleMenuClick)) {
                    handleMenuClick({ key, handleData: r });
                  }
                }}
              />
            );
          }

          if (type === dropdownExpandItemType.divider) {
            return (
              <Divider
                key={key}
                style={{
                  margin: 0,
                  ...((color || null) == null ? {} : { borderColor: color }),
                }}
              />
            );
          }

          return null;
        })}

        <div
          style={{
            height: '4px',
          }}
        />
      </div>
    );
  }
}

ElasticityMenu.defaultProps = {
  handleData: {},
  handleMenuClick: () => {},
  items: [],
};

export { ElasticityMenu };
