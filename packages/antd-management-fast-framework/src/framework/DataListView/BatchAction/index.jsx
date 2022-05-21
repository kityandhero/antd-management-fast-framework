import { Dropdown, Menu, Button } from 'antd';
import { ConfigConsumer } from 'antd/lib/config-provider/context';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';

import IconInfo from '../../../customComponents/IconInfo';

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
      const menu = (
        <Menu onClick={(params) => onSelect && onSelect(params.key)}>
          {menus.map((item) => (
            <Menu.Item
              key={item.key}
              disabled={(item.disabled || null) == null ? false : item.disabled}
            >
              <IconInfo icon={item.icon} text={item.name} />
            </Menu.Item>
          ))}
        </Menu>
      );

      return (
        <Dropdown
          overlay={menu}
          className={styles.batchAction}
          disabled={disabled}
        >
          <Button style={style}>
            {children} <DownOutlined />
          </Button>
        </Dropdown>
      );
    }}
  </ConfigConsumer>
);

const BatchAction = ({ style, onSelect, menus = [], disabled }) => (
  <ConfigConsumer>
    {() => {
      const menu = (
        <Menu onClick={(params) => onSelect && onSelect(params.key)}>
          {menus.map((item) => (
            <Menu.Item key={item.key}>{item.name}</Menu.Item>
          ))}
        </Menu>
      );
      return (
        <Dropdown
          overlay={menu}
          className={styles.batchAction}
          disabled={disabled}
        >
          <a style={style}>
            <EllipsisOutlined />
          </a>
        </Dropdown>
      );
    }}
  </ConfigConsumer>
);

BatchAction.Button = DropdownButton;

export default BatchAction;
