import { Alert, Table } from 'antd';
import React, { PureComponent } from 'react';

import { AnchorLink } from '../AnchorLink';

import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  for (const column of columns) {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  }
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(properties) {
    super(properties);
    const { columns } = properties;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProperties) {
    // clean state
    if (nextProperties.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProperties.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map((item) => ({
      ...item,
      total: selectedRows.reduce(
        (sum, value) => sum + Number.parseFloat(value[item.dataIndex], 10),
        0,
      ),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data = {}, rowKey, ...rest } = this.props;
    const { list = [], pagination } = data;

    const paginationProperties = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record) => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <>
                已选择{' '}
                <AnchorLink style={{ fontWeight: 600 }}>
                  {selectedRowKeys.length}
                </AnchorLink>{' '}
                项&nbsp;&nbsp;
                {needTotalList.map((item) => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <AnchorLink
                  onClick={this.cleanSelectedKeys}
                  style={{ marginLeft: 24 }}
                >
                  清空
                </AnchorLink>
              </>
            }
            type="info"
            showIcon
          />
        </div>

        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProperties}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export { StandardTable };
