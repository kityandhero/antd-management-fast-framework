import { Table } from 'antd';
import React, { PureComponent } from 'react';

import { checkStringIsNullOrWhiteSpace, isArray } from 'easy-soft-utility';

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    ellipsis: true,
    render: (value) => {
      if (!checkStringIsNullOrWhiteSpace(value)) {
        return value;
      }

      return <span style={{ color: '#bfbfbf' }}>暂无</span>;
    },
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: '120px',
    ellipsis: true,
    render: (value) => {
      if (!checkStringIsNullOrWhiteSpace(value)) {
        return value;
      }

      return <span style={{ color: '#bfbfbf' }}>暂无</span>;
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: '120px',
    ellipsis: true,
    render: (value) => {
      if (!checkStringIsNullOrWhiteSpace(value)) {
        return value;
      }

      return <span style={{ color: '#bfbfbf' }}>暂无</span>;
    },
  },
];

class DataDisplayer extends PureComponent {
  render() {
    const { schema, style } = this.props;

    const schemaAdjust = isArray(schema)
      ? schema.map((o, index) => {
          return {
            key: `data_index_${index}`,
            ...o,
          };
        })
      : [];

    return (
      <div style={style}>
        <Table
          columns={columns}
          size="small"
          dataSource={schemaAdjust}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </div>
    );
  }
}

DataDisplayer.defaultProps = {
  schema: {},
  style: null,
};

export { DataDisplayer };
