import { Input } from 'antd';

import styles from './index.less';

const Node = (props) => {
  const { size, onClick: click } = props;

  return (
    <div className={styles.node} onClick={click}>
      <div className={styles.header}>{props.title}</div>
      {size !== 'small' && (
        <div className={styles.content}>
          <div className={styles.info}>
            <Input size="small" placeholder="申请人姓名" />
          </div>
          <div className={styles.history}>修改: 10 阅读: 20</div>
        </div>
      )}
    </div>
  );
};

Node.defaultProps = {
  color: 'black',
};

export default Node;
