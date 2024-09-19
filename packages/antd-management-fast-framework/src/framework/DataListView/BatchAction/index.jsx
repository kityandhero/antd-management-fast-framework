import { Button, Dropdown } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { IconInfo } from 'antd-management-fast-component';

import { switchControlAssist } from '../../../utils';

import styles from './index.less';

@connect(({ switchControl }) => ({
  switchControl,
}))
class BatchAction extends PureComponent {
  getProperties = () => {
    return {
      type: 'default',
      icon: null,
      text: '按钮',
      size: 'small',
      danger: false,
      menus: [],
      onClick: null,
      onSelect: null,
      disabled: false,
      ...this.props,
    };
  };

  render() {
    const {
      switchControl,
      flag,
      type,
      icon,
      text,
      size,
      danger,
      menus,
      onClick,
      onSelect,
      disabled,
    } = this.getProperties();

    const loading = switchControlAssist.check(switchControl, flag);

    const items = menus.map((item) => {
      return {
        key: item.key,
        label: item.name,
        icon: item.icon,
        disabled: (item.disabled || null) == null ? false : item.disabled,
      };
    });

    if (items.length === 0) {
      return (
        <Button
          type={type}
          size={size}
          disabled={disabled || loading}
          danger={danger}
          onClick={() => {
            if (!isFunction(onClick)) {
              return;
            }

            onClick();
          }}
        >
          <IconInfo icon={icon} text={text} />
        </Button>
      );
    }

    if (isFunction(onClick)) {
      return (
        <Dropdown.Button
          className={styles.batchAction}
          type={type}
          disabled={disabled || loading}
          size={size}
          danger={danger}
          menu={{
            items: items,
            onClick: (parameters) => onSelect && onSelect(parameters.key),
          }}
          onClick={onClick}
        >
          <IconInfo icon={icon} text={text} />
        </Dropdown.Button>
      );
    }

    return (
      <Dropdown
        menu={{
          items: items,
          onClick: (parameters) => onSelect && onSelect(parameters.key),
        }}
        className={styles.batchAction}
        disabled={disabled || loading}
      >
        <Button danger={danger} size={size}>
          <IconInfo icon={icon} text={text} />
        </Button>
      </Dropdown>
    );
  }
}

export { BatchAction };
