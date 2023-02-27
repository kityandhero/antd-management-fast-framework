import { Button, Divider, Popconfirm } from 'antd';
import classNames from 'classnames';
import React from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  getGuid,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  logObject,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { dropdownExpandItemType } from 'antd-management-fast-common';

import { BaseComponent } from '../../BaseComponent';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';

class AmfMenu extends BaseComponent {
  renderFurther() {
    const { handleData: r, items, handleMenuClick } = this.props;

    if (!isFunction(handleMenuClick)) {
      throw new Error('buildMenu : handleMenuClick must be function');
    }

    if (!isArray(items)) {
      throw new Error('buildMenu : items must be array');
    }

    let listItem = [];

    for (const o of items || []) {
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
        if (withDivider && type === dropdownExpandItemType.item) {
          const divider = {
            key: getGuid(),
            icon: null,
            text: '',
            disabled,
            hidden,
            type: dropdownExpandItemType.divider,
          };

          if (uponDivider) {
            listItem.push(divider);
          }

          listItem.push(d);

          if (!uponDivider) {
            listItem.push(divider);
          }
        } else {
          listItem.push(d);
        }
      }
    }

    listItem = listItem.map((o) => {
      const d = { ...o };

      const { confirm } = d;

      if (confirm) {
        if (isBoolean(confirm)) {
          throw new Error(
            'buildMenu : confirm property in menu Items not allow bool when check confirm is true.',
          );
        }

        const { placement, title, handleConfirm, okText, cancelText } = {
          placement: 'topRight',
          title: '将要进行操作，确定吗？',
          handleConfirm: ({ key, handleData }) => {
            handleMenuClick({ key, handleData });
          },
          okText: '确定',
          cancelText: '取消',
          ...(isObject(confirm) ? confirm : {}),
        };

        d.confirm = {
          placement,
          title,
          handleConfirm,
          okText,
          cancelText,
        };
      } else {
        d.confirm = false;
      }

      return d;
    });

    return (
      <div className={classNames('amf-dropdownExpandItemCustom')}>
        <div
          style={{
            height: '4px',
          }}
        />

        {listItem.map((o) => {
          const { type, key, icon, text, disabled, hidden, confirm, color } = o;

          console.log({ key });

          if (checkStringIsNullOrWhiteSpace(key)) {
            showSimpleErrorMessage('key is not allow empty');
          }

          if (hidden) {
            return null;
          }

          if (type === dropdownExpandItemType.item) {
            if (confirm) {
              const { placement, title, handleConfirm, okText, cancelText } =
                confirm;

              return (
                <Popconfirm
                  key={key}
                  placement={placement}
                  title={title}
                  onConfirm={() => handleConfirm({ key, handleData: r })}
                  okText={okText}
                  cancelText={cancelText}
                  disabled={disabled}
                  overlayStyle={{ zIndex: 1060 }}
                >
                  <Button
                    className={classNames(
                      'amf-dropdownExpandItemCustom_button',
                    )}
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
                    disabled={disabled}
                  >
                    <IconInfo
                      icon={icon || iconBuilder.edit()}
                      text={text}
                      style={(color || null) == null ? null : { color: color }}
                    />
                  </Button>
                </Popconfirm>
              );
            }

            return (
              <Button
                key={key}
                className={classNames('amf-dropdownExpandItemCustom_button')}
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
                disabled={disabled}
                onClick={() => handleMenuClick({ key, handleData: r })}
              >
                <IconInfo
                  icon={icon || iconBuilder.edit()}
                  text={text}
                  style={(color || null) == null ? null : { color: color }}
                />
              </Button>
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

AmfMenu.defaultProps = {
  handleData: {},
  handleMenuClick: () => {},
  items: [],
};

export { AmfMenu };
