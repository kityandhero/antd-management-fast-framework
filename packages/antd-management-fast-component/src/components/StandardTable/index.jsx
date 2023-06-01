import { Alert, Table } from 'antd';
import React, { PureComponent } from 'react';

import { logDebug, mergeArrowText } from 'easy-soft-utility';

import { listViewConfig } from 'antd-management-fast-common';

import { AnchorLink } from '../AnchorLink';

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
    if ((nextProperties.selectedRows || []).length === 0) {
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
      total: (selectedRows || []).reduce(
        (sum, value) => sum + Number.parseFloat(value[item.dataIndex], 10),
        0,
      ),
    }));

    const { onSelectRow } = this.props;

    if (onSelectRow) {
      onSelectRow(selectedRows || []);
    }

    this.setState({ selectedRowKeys, needTotalList });
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
      );

    const containerStyle = {
      backgroundColor: '#fff',
      padding: '10px 12px 0px 12px',
      borderRadius: '8px',
      ...style,
    };

    logDebug(containerStyle, mergeArrowText('StandardTable', 'containerStyle'));

    return (
      <div style={containerStyle}>
        {rowSelectionMessage}

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
      </div>
    );
  }
}

StandardTable.defaultProps = {
  showPagination: true,
  style: null,
};

export { StandardTable };