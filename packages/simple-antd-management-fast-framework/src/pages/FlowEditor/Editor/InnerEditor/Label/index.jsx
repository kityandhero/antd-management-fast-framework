import { Tooltip } from 'antd';

import styles from './index.less';

const Label = () => {
  return (
    <Tooltip title="我, 是一个label">
      <div className={styles.label}>+</div>
    </Tooltip>
  );
};

export default Label;
