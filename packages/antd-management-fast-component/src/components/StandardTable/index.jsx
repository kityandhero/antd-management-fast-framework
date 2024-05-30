import { Alert, Table, Typography } from 'antd';
import React, { PureComponent } from 'react';

import { logTrace, mergeArrowText, toString } from 'easy-soft-utility';

import { listViewConfig } from 'antd-management-fast-common';

const { Link } = Typography;

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
      needTotalList: [...needTotalList],
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties) {
    // clean state
    if ((nextProperties.selectedRows || []).length === 0) {
      const needTotalList = initTotalList(nextProperties.columns);
      return {
        selectedRowKeys: [],
        needTotalList: [...needTotalList],
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { needTotalList } = this.state;

    const list = needTotalList.map((item) => ({
      ...item,
      total: (selectedRows || []).reduce(
        (sum, value) => sum + Number.parseFloat(value[item.dataIndex], 10),
        0,
      ),
    }));

    const { onSelectRow } = this.props;

    if (onSelectRow) {
      onSelectRow(selectedRows || []);
    }

    this.setState({
      selectedRowKeys: [...selectedRowKeys],
      needTotalList: [...list],
    });
  };

  handleTableChange = (pagination, filters, sorter, extra) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(pagination, filters, sorter, extra);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;

    const {
      data: { list, pagination },
      rowKey,
      size,
      showSelect: showSelectOption,
      showPagination,
      style,
      ...rest
    } = this.props;

    const paginationProperties = showPagination
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          ...pagination,
        }
      : false;

    const { selectedRows } = this.props;
    const showSelect = showSelectOption || false;

    const rowSelection =
      (selectedRows || []).length === 0 && !showSelect
        ? null
        : {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: (record) => ({
              disabled: record.disabled,
            }),
          };

    const rowSelectionMessage =
      rowSelection === null ? (
        ''
      ) : (
        <div style={{ paddingBottom: '10px' }}>
          <Alert
            message={
              <>
                已选择
                <Link
                  style={{ fontWeight: 600, marginLeft: 6, marginRight: 6 }}
                >
                  {toString(selectedRowKeys.length)}
                </Link>
                项
                {needTotalList.map((item) => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <Link
                  onClick={this.cleanSelectedKeys}
                  style={{ marginLeft: 10 }}
                >
                  清空
                </Link>
              </>
            }
            type="info"
            showIcon
          />
        </div>
      );

    const containerStyle = {
      backgroundColor: '#fff',
      padding: '10px 12px 0px 12px',
      borderRadius: '8px',
      ...style,
    };

    logTrace(containerStyle, mergeArrowText('StandardTable', 'containerStyle'));

    logTrace(
      {
        size: size || listViewConfig.tableSize.middle,
        dataSource: list,
        pagination: paginationProperties,
      },
      mergeArrowText('StandardTable', 'Table', 'props'),
    );

    const table = (
      <Table
        rowKey={rowKey || 'key'}
        size={size || listViewConfig.tableSize.middle}
        rowSelection={rowSelection}
        dataSource={list}
        pagination={paginationProperties}
        onChange={this.handleTableChange}
        defaultExpandAllRows
        {...rest}
        loading={false}
      />
    );

    return (
      <div style={containerStyle}>
        {rowSelectionMessage}

        {rowSelection === null ? (
          table
        ) : (
          <div
            style={{
              width: '100%',
              height: 'calc(100% - 50px)',
            }}
          >
            {table}
          </div>
        )}
      </div>
    );
  }
}

StandardTable.defaultProps = {
  showPagination: true,
  showSelect: false,
  rowKey: 'key',
  size: null,
  style: null,
};

export { StandardTable };
