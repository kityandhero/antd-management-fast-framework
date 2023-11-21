import { Button, Divider, Space, Table } from 'antd';
import React, { PureComponent } from 'react';

import { isArray, isEmptyArray, isFunction } from 'easy-soft-utility';

import {
  buildDropdownButton,
  ColorText,
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

class FileViewer extends PureComponent {
  handleMenuClick = ({ key, handleData }) => {
    const { onRemove } = this.props;

    switch (key) {
      case 'removeItem': {
        if (isFunction(onRemove)) {
          onRemove(handleData);
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  render() {
    const {
      canUpload,
      canRemove,
      list,
      dataTransfer,
      onUploadButtonClick,
      onItemClick,
    } = this.props;

    const listAdjust = (!isArray(list) || isEmptyArray(list) ? [] : list).map(
      (o) => {
        if (isFunction(dataTransfer)) {
          return dataTransfer(o);
        }

        return o;
      },
    );

    const fileCount = listAdjust.length;

    const menuItems = [];

    if (canRemove) {
      menuItems.push({
        key: 'removeItem',
        icon: iconBuilder.delete(),
        text: '删除附件',
        confirm: true,
        title: '将要删除附件，确定吗？',
      });
    }

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '220px',
        ellipsis: true,
      },
      {
        title: '链接',
        dataIndex: 'url',
        key: 'url',
        ellipsis: true,
      },
      {
        title: '操作',
        align: 'center',
        key: 'action',
        width: '110px',
        render: (_, record) => (
          <Space size="middle">
            {buildDropdownButton({
              size: 'small',
              text: '查看',
              icon: iconBuilder.read(),
              handleButtonClick: ({ handleData }) => {
                onItemClick(handleData);
              },
              handleData: record,
              handleMenuClick: ({ key, handleData }) => {
                this.handleMenuClick({ key, handleData });
              },
              items: menuItems,
            })}
          </Space>
        ),
      },
    ];

    return (
      <>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>表单附件：</VerticalBox>}
          right={
            <div>
              <Space direction="horizontal" split={<Divider type="vertical" />}>
                <ColorText
                  textPrefix="附件数量"
                  separatorStyle={{ padding: '0 4px 0 2px' }}
                  text={`${fileCount}个`}
                />

                {canUpload ? (
                  <Button
                    type="default"
                    size="small"
                    onClick={(event) => {
                      if (isFunction(onUploadButtonClick)) {
                        onUploadButtonClick(event);
                      }
                    }}
                  >
                    上传附件
                  </Button>
                ) : null}
              </Space>
            </div>
          }
        />

        <Table
          columns={columns}
          size="small"
          dataSource={listAdjust}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </>
    );
  }
}

FileViewer.defaultProps = {
  list: [],
  canUpload: false,
  canRemove: false,
  dataTransfer: (o) => o,
  onItemClick: null,
  onUploadButtonClick: null,
  onRemove: () => {},
};

export { FileViewer };
