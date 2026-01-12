import { Button, Divider, Space, Table } from 'antd';
import React, { PureComponent } from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  isArray,
  isEmptyArray,
  isFunction,
  showErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import { copyToClipboard } from 'antd-management-fast-common';
import {
  buildDropdownButton,
  ColorText,
  EverySpace,
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

const defaultProperties = {
  label: '',
  previewButtonText: '查看',
  previewButtonIcon: null,
  list: [],
  canPreview: true,
  canSupplement: false,
  canUpload: false,
  canCopyUrl: true,
  canDownload: true,
  canRemove: false,
  showUrl: false,
  splitHeight: 0,
  dataTransfer: (o) => o,
  extraColumns: null,
  nameRender: null,
  urlRender: null,
  onItemClick: null,
  onUploadButtonClick: null,
  onSupplementButtonClick: null,
  onRemove: () => {},
};

class FileViewer extends PureComponent {
  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  handleMenuClick = ({ key, handleData }) => {
    const { onRemove } = this.props;

    switch (key) {
      case 'copyUrl': {
        const url = getValueByKey({
          data: handleData,
          key: 'url',
          defaultValue: '',
        });

        if (checkStringIsNullOrWhiteSpace(url)) {
          showErrorMessage('下载链接地址(url)无效');
        } else {
          copyToClipboard(url);
        }
        break;
      }

      case 'download': {
        const url = getValueByKey({
          data: handleData,
          key: 'url',
          defaultValue: '',
        });

        if (checkStringIsNullOrWhiteSpace(url)) {
          showErrorMessage('下载链接地址(url)无效');
        } else {
          window.open(url, '_blank');
        }
        break;
      }

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

  buildMenu = (o) => {
    const { canCopyUrl, canDownload, canRemove } = this.getProperties();

    const menuItems = [];

    const {
      canCopyUrl: canCopyUrlItem,
      canDownload: canDownloadItem,
      canRemove: canRemoveItem,
    } = {
      canCopyUrl: true,
      canDownload: true,
      canRemove: true,
      ...o,
    };

    if (canCopyUrl && canCopyUrlItem) {
      menuItems.push({
        key: 'copyUrl',
        icon: iconBuilder.download(),
        text: '复制链接',
      });
    }

    if (canDownload && canDownloadItem) {
      menuItems.push({
        key: 'download',
        icon: iconBuilder.download(),
        text: '下载附件',
      });
    }

    if (canRemove && canRemoveItem) {
      menuItems.push({
        key: 'removeItem',
        icon: iconBuilder.delete(),
        text: '删除附件',
        confirm: true,
        title: '将要删除附件，确定吗？',
        placement: 'bottomRight',
      });
    }

    return menuItems;
  };

  render() {
    const {
      label,
      previewButtonText,
      previewButtonIcon,
      canPreview,
      canUpload,
      canSupplement,
      showUrl,
      splitHeight,
      list,
      dataTransfer,
      extraColumns,
      nameRender,
      urlRender,
      onUploadButtonClick,
      onSupplementButtonClick,
      onItemClick,
    } = this.getProperties();

    const listAdjust = (!isArray(list) || isEmptyArray(list) ? [] : list).map(
      (o) => {
        if (isFunction(dataTransfer)) {
          return dataTransfer(o);
        }

        return o;
      },
    );

    const fileCount = listAdjust.length;

    let columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        ...(showUrl ? { width: '220px' } : {}),
        ellipsis: true,
        ...(isFunction(nameRender) ? { render: nameRender } : {}),
      },
    ];

    if (showUrl) {
      columns.push({
        title: '链接',
        dataIndex: 'url',
        key: 'url',
        ellipsis: true,
        ...(isFunction(urlRender) ? { render: urlRender } : {}),
      });
    }

    if (isArray(extraColumns) && !isEmptyArray(extraColumns)) {
      columns = [...columns, ...extraColumns];
    }

    columns.push({
      title: '操作',
      align: 'center',
      key: 'action',
      width: '110px',
      render: (_, record) => {
        const { canPreview: canPreviewItem } = {
          canPreview: true,
          ...record,
        };

        return (
          <Space size="middle">
            {buildDropdownButton({
              size: 'small',
              text: previewButtonText ?? '查看',
              icon: previewButtonIcon ?? iconBuilder.read(),
              disabled: !canPreview || !canPreviewItem,
              handleButtonClick: ({ handleData }) => {
                onItemClick(handleData);
              },
              handleData: record,
              handleMenuClick: ({ key, handleData }) => {
                this.handleMenuClick({ key, handleData });
              },
              items: this.buildMenu(record),
            })}
          </Space>
        );
      },
    });

    return (
      <>
        <FlexBox
          flexAuto="left"
          left={
            <VerticalBox>
              {checkStringIsNullOrWhiteSpace(label) ? (
                <div></div>
              ) : (
                `${label}：`
              )}
            </VerticalBox>
          }
          right={
            <div>
              <Space
                orientation="horizontal"
                separator={<Divider orientation="vertical" />}
              >
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

                {canSupplement ? (
                  <Button
                    type="default"
                    size="small"
                    onClick={(event) => {
                      if (isFunction(onSupplementButtonClick)) {
                        onSupplementButtonClick(event);
                      }
                    }}
                  >
                    追加附件
                  </Button>
                ) : null}
              </Space>
            </div>
          }
        />

        {toNumber(splitHeight) > 0 ? (
          <EverySpace size={splitHeight} direction="horizontal" />
        ) : null}

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
  ...defaultProperties,
};

export { FileViewer };
