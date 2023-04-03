import React, { PureComponent } from 'react';

import styles from './index.less';

class DisplayItem extends PureComponent {
  render() {
    const { name, value, empty } = this.props;

    return (
      <div className={styles.fieldBox}>
        {name}:{value || empty || ''}
      </div>
    );
  }
}

DisplayItem.defaultProps = {
  name: '标题',
  value: null,
  empty: '',
};

export { DisplayItem };
