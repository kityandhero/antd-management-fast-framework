import { Button, Dropdown } from 'antd';
import { ConfigConsumer } from 'antd/lib/config-provider/context';
import React from 'react';

import { iconBuilder } from 'antd-management-fast-component';

import styles from './index.less';

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
const DropdownButton = ({
  children,
  menus = [],
  onSelect,
  style,
  disabled,
}) => (
  <ConfigConsumer>
    {() => {
      const items = menus.map((item) => {
        return {
          key: item.key,
          label: item.name,
          icon: item.icon,
          disabled: (item.disabled || null) == null ? false : item.disabled,
        };
      });

      return (
        <Dropdown
          menu={{
            items: items,
            onClick: (params) => onSelect && onSelect(params.key),
          }}
          className={styles.batchAction}
          disabled={disabled}
        >
          <Button style={style}>
            {children} {iconBuilder.down()}
          </Button>
        </Dropdown>
      );
    }}
  </ConfigConsumer>
);

const BatchAction = ({ style, onSelect, menus = [], disabled }) => (
  <ConfigConsumer>
    {() => {
      const items = menus.map((item) => {
        return {
          key: item.key,
          label: item.name,
          icon: item.icon,
          disabled: (item.disabled || null) == null ? false : item.disabled,
        };
      });

      return (
        <Dropdown
          menu={{
            items: items,
            onClick: (params) => onSelect && onSelect(params.key),
          }}
          className={styles.batchAction}
          disabled={disabled}
        >
          <a style={style}>{iconBuilder.ellipsis()}</a>
        </Dropdown>
      );
    }}
  </ConfigConsumer>
);

BatchAction.Button = DropdownButton;

export { BatchAction };
