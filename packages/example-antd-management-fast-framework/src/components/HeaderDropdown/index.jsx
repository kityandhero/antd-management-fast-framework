import { Dropdown } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

const HeaderDropdown = ({ overlayClassName: cls, ...restProperties }) => (
  <Dropdown
    overlayClassName={classNames(styles.container, cls)}
    {...restProperties}
    arrow
    placement="bottomRight"
  />
);

export default HeaderDropdown;
