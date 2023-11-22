import { ColorPicker, Input, Popconfirm, Table, Typography } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  filter,
  getGuid,
  isArray,
  isFunction,
  toMd5,
  toString,
} from 'easy-soft-utility';

import {
  BaseComponent,
  buildButton,
  FlexBox,
  iconBuilder,
  PageExtra,
  VerticalBox,
} from 'antd-management-fast-component';

const { ToolBar } = PageExtra;

class RemarkEditor extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      dataTag: '',
      dataStorage: [],
      dataBackup: [],
    };
  }

  templateStorage = {};

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { data } = nextProperties;
    const { dataTag } = previousState;

    if (toMd5(JSON.stringify(data || [])) != dataTag) {
      let listAdjust = [];

      const { color, list } = {
        color: '',
        list: [],
        ...data,
      };

      listAdjust = isArray(list)
        ? list.map((o) => {
            const uuid = getGuid();

            return {
              id: uuid,
              key: uuid,
              text: toString(o),
              editing: false,
            };
          })
        : [];

      return {
        dataTag: toMd5(JSON.stringify(data || [])),
        dataStorage: listAdjust,
        dataBackup: listAdjust,
        color: color || '',
      };
    }

    return null;
  }

  onChange = (data) => {
    this.setState({ dataStorage: data || [] });
  };

  changeColor = (color) => {
    this.setState({ color: color || '' });
  };

  add = () => {
    const { dataStorage } = this.state;

    const uuid = getGuid();

    if (!isArray(dataStorage)) {
      this.setState({
        dataStorage: [
          {
            id: uuid,
            key: uuid,
            text: '',
            editing: false,
          },
        ],
      });

      return;
    }

    const list = [...dataStorage];

    list.push({
      id: uuid,
      key: uuid,
      text: '',
      editing: false,
    });

    this.setState({ dataStorage: [...list] });
  };

  edit = (item) => {
    const { dataStorage } = this.state;

    const { id } = item;

    const dataAdjust = dataStorage.map((o) => {
      const { id: idItem } = o;

      if (idItem === id) {
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

    const { id } = item;

    const dataAdjust = dataStorage.map((o) => {
      const { id: idItem } = o;

      if (idItem === id) {
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

  saveItem = ({ id }) => {
    const { dataStorage } = this.state;

    const dataAdjust = dataStorage.map((o) => {
      const { id: idItem } = o;

      if (idItem === id) {
        return {
          ...o,
          text: this.templateStorage[id] ?? '',
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

  deleteItem = (item) => {
    const { dataStorage } = this.state;

    const { id } = item;

    const list = [];

    for (const o of dataStorage) {
      const { id: idItem } = o;

      if (idItem === id) {
        continue;
      }

      list.push({
        ...o,
        editing: false,
      });
    }

    this.setState({ dataStorage: [...list] });
  };

  reset = () => {
    const { dataBackup } = this.state;

    const list = [...dataBackup];

    console.log(list);

    this.setState({ dataStorage: [...list] });
  };

  save = () => {
    const { onSave } = this.props;

    if (!isFunction(onSave)) {
      return;
    }

    const { dataStorage, color } = this.state;

    const list = dataStorage.map((o) => {
      const { text } = o;

      return text;
    });

    const listAdjust = filter(list, (one) => {
      return !checkStringIsNullOrWhiteSpace(one || '');
    });

    onSave({
      color: color || '',
      list: listAdjust || [],
    });
  };

  getColumn = () => {
    return [
      {
        title: '序号',
        dataIndex: 'id',
        align: 'center',
        width: 70,
        render: (value, record, index) => {
          return index + 1;
        },
      },
      {
        title: '备注描述',
        dataIndex: 'text',
        render: (value, record) => {
          const { id, editing } = record;

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

                this.templateStorage[id] = v;
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
          const { id, editing } = record;

          return editing ? (
            <span>
              <Typography.Link
                onClick={() => this.saveItem({ id })}
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
            <span>
              <Typography.Link
                onClick={() => this.edit(record)}
                style={{ marginRight: 8 }}
              >
                编辑
              </Typography.Link>

              <Popconfirm
                title="确定删除吗?"
                onConfirm={() => {
                  this.deleteItem(record);
                }}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
  };

  render() {
    const { style } = this.props;
    const { dataStorage, color } = this.state;

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
                  component: (
                    <FlexBox
                      flexAuto="right"
                      left={<VerticalBox>颜色：</VerticalBox>}
                      right={
                        <div
                          style={{
                            minWidth: '104px',
                          }}
                        >
                          <VerticalBox>
                            <ColorPicker
                              value={color}
                              showText
                              presets={[
                                {
                                  label: '常用',
                                  colors: [
                                    '#000000',
                                    '#000000E0',
                                    '#000000A6',
                                    '#00000073',
                                    '#00000040',
                                    '#00000026',
                                    '#0000001A',
                                    '#00000012',
                                    '#0000000A',
                                    '#00000005',
                                    '#F5222D',
                                    '#FA8C16',
                                    '#FADB14',
                                    '#8BBB11',
                                    '#52C41A',
                                    '#13A8A8',
                                    '#1677FF',
                                    '#2F54EB',
                                    '#722ED1',
                                    '#EB2F96',
                                    '#F5222D4D',
                                    '#FA8C164D',
                                    '#FADB144D',
                                    '#8BBB114D',
                                    '#52C41A4D',
                                    '#13A8A84D',
                                    '#1677FF4D',
                                    '#2F54EB4D',
                                    '#722ED14D',
                                    '#EB2F964D',
                                  ],
                                },
                              ]}
                              onChange={(_, hex) => {
                                this.changeColor(hex);
                              }}
                            />
                          </VerticalBox>
                        </div>
                      }
                    />
                  ),
                },
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
                    text: '重置编辑',
                    icon: iconBuilder.undo(),
                    title: '即将重置为初始数据，确定吗？',
                    confirm: true,
                    handleClick: () => {
                      this.reset();
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
