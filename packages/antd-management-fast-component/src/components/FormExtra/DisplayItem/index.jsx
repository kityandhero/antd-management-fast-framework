import React from 'react';

import { BaseComponent } from '../../../bases';

import styles from './index.less';

class DisplayItem extends BaseComponent {
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
