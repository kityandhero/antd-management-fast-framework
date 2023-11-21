import { Input, Popconfirm, Table, Typography } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  filter,
  isArray,
  isFunction,
  toMd5,
  toString,
} from 'easy-soft-utility';

import {
  BaseComponent,
  buildButton,
  iconBuilder,
  PageExtra,
} from 'antd-management-fast-component';

const { ToolBar } = PageExtra;

class RemarkEditor extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      dataTag: '',
      dataStorage: [],
    };
  }

  templateStorage = {};

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { data } = nextProperties;
    const { dataTag } = previousState;

    if (toMd5(JSON.stringify(data || [])) != dataTag) {
      let dataAdjust = [];

      dataAdjust = isArray(data)
        ? data.map((o, index) => {
            return {
              no: index + 1,
              key: `item_${index + 1}`,
              text: toString(o),
              editing: false,
            };
          })
        : [];

      return {
        dataTag: toMd5(JSON.stringify(data || [])),
        dataStorage: dataAdjust,
      };
    }

    return null;
  }

  onChange = (data) => {
    this.setState({ dataStorage: data || [] });
  };

  add = () => {
    const { dataStorage } = this.state;

    if (!isArray(dataStorage)) {
      this.setState({
        dataStorage: [
          {
            no: 1,
            key: `item_${1}`,
            text: '',
            editing: false,
          },
        ],
      });
    }

    const list = [...dataStorage];

    list.push({
      no: dataStorage.length + 1,
      key: `item_${dataStorage.length + 1}`,
      text: '',
      editing: false,
    });

    this.setState({ dataStorage: [...list] });
  };

  edit = (item) => {
    const { dataStorage } = this.state;

    const { no } = item;

    const dataAdjust = dataStorage.map((o) => {
      const { no: noItem } = o;

      if (noItem === no) {
        return {
          ...o,
          editing: true,
        };
      }

      return {
        ...o,
        editing: false,
      };
    });

    this.setState({ dataStorage: [...dataAdjust] });
  };

  cancelEdit = (item) => {
    const { dataStorage } = this.state;

    const { no } = item;

    const dataAdjust = dataStorage.map((o) => {
      const { no: noItem } = o;

      if (noItem === no) {
        return {
          ...o,
          editing: false,
        };
      }

      return {
        ...o,
        editing: false,
      };
    });

    this.setState({ dataStorage: [...dataAdjust] });
  };

  saveItem = ({ no }) => {
    const { dataStorage } = this.state;

    const dataAdjust = dataStorage.map((o) => {
      const { no: noItem } = o;

      if (noItem === no) {
        return {
          ...o,
          text: this.templateStorage[no] ?? '',
          editing: false,
        };
      }

      return {
        ...o,
        editing: false,
      };
    });

    this.setState({ dataStorage: [...dataAdjust] });
  };

  save = () => {
    const { onSave } = this.props;

    if (!isFunction(onSave)) {
      return;
    }

    const { dataStorage } = this.state;

    const list = dataStorage.map((o) => {
      const { text } = o;

      return text;
    });

    const listAdjust = filter(list, (one) => {
      return !checkStringIsNullOrWhiteSpace(one || '');
    });

    onSave(listAdjust || []);
  };

  getColumn = () => {
    return [
      {
        title: '序号',
        dataIndex: 'no',
        align: 'center',
        width: 70,
      },
      {
        title: '备注描述',
        dataIndex: 'text',
        render: (value, record) => {
          const { no, editing } = record;

          if (!editing) {
            return value;
          }

          return (
            <Input
              defaultValue={value}
              onChange={(event) => {
                const {
                  target: { value: v },
                } = event;

                this.templateStorage[no] = v;
              }}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 100,
        render: (_, record) => {
          const { no, editing } = record;

          return editing ? (
            <span>
              <Typography.Link
                onClick={() => this.saveItem({ no })}
                style={{ marginRight: 8 }}
              >
                确定
              </Typography.Link>

              <Popconfirm
                title="确定取消吗?"
                onConfirm={() => {
                  this.cancelEdit(record);
                }}
              >
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link onClick={() => this.edit(record)}>
              编辑
            </Typography.Link>
          );
        },
      },
    ];
  };

  render() {
    const { style } = this.props;
    const { dataStorage } = this.state;

    const columns = this.getColumn();

    return (
      <>
        <div style={style}>
          <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <ToolBar
              stick={false}
              title="操作栏"
              tools={[
                {
                  component: buildButton({
                    text: '新增条目',
                    icon: iconBuilder.addCircle(),
                    handleClick: () => {
                      this.add();
                    },
                  }),
                },
                {
                  component: buildButton({
                    text: '保存',
                    type: 'primary',
                    icon: iconBuilder.save(),
                    handleClick: () => {
                      this.save();
                    },
                  }),
                },
              ]}
            />
          </div>

          <Table
            bordered
            dataSource={dataStorage}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              hideOnSinglePage: true,
            }}
          />
        </div>
      </>
    );
  }
}

RemarkEditor.defaultProps = {
  data: [],
  style: null,
};

export { RemarkEditor };
