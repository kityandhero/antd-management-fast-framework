import { Button, Dropdown, Menu } from 'antd';
import { ConfigConsumer } from 'antd/lib/config-provider/context';

import { iconCollection } from '../../../utils/constants';

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

      const menu = (
        <Menu
          items={items}
          onClick={(params) => onSelect && onSelect(params.key)}
        />
      );

      return (
        <Dropdown
          overlay={menu}
          className={styles.batchAction}
          disabled={disabled}
        >
          <Button style={style}>
            {children} {iconCollection.down}
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

      const menu = (
        <Menu
          items={items}
          onClick={(params) => onSelect && onSelect(params.key)}
        />
      );

      return (
        <Dropdown
          overlay={menu}
          className={styles.batchAction}
          disabled={disabled}
        >
          <a style={style}>iconCollection.ellipsis</a>
        </Dropdown>
      );
    }}
  </ConfigConsumer>
);

BatchAction.Button = DropdownButton;

export default BatchAction;
