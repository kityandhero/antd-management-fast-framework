import { Divider } from 'antd';
import classNames from 'classnames';
import React from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
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
