import { Card, Table } from 'antd';
import React from 'react';

import { BaseComponent } from '../../bases';

import styles from './index.less';

class RowExpandTable extends BaseComponent {
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
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
