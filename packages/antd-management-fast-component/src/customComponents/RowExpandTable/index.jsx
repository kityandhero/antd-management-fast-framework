import { Card, Table } from 'antd';
import React from 'react';

import { BaseComponent } from '../BaseComponent';

import styles from './index.less';

class RowExpandTable extends BaseComponent {
  renderFurther() {
    const { tableConfig } = this.props;

    return (
      <div className={styles.rowExpandTable}>
        <Card>
          <Table {...tableConfig} />
        </Card>
      </div>
    );
  }
}

RowExpandTable.defaultProps = {
  tableConfig: null,
};

export { RowExpandTable };
