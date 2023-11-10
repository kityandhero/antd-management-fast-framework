import { Table } from 'antd';
import React, { PureComponent } from 'react';

import { isArray } from 'easy-soft-utility';

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: '120px',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: '120px',
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
