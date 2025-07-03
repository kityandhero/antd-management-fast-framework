import React from 'react';
import DocViewer from '@cyntler/react-doc-viewer';

import {
  checkInCollection,
  convertCollection,
  formatCollection,
  getValueByKey,
  toLower,
  whetherNumber,
} from 'easy-soft-utility';

import {
  buildCustomGrid,
  buildPlayer,
  FrameBox,
  ImageBox,
} from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  fieldDataFlowCaseFormAttachment,
  fileTypeCollection,
} from '../../../customConfig';
import { getFlowCaseFormAttachmentStatusName } from '../../../customSpecialComponents';

const { BaseVerticalFlexDrawer } = DataDrawer;

class BaseAttachmentPreviewDrawer extends BaseVerticalFlexDrawer {
  resetDataAfterLoad = false;

  frameRef = React.createRef();

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 1200,
      pageTitle: '附件预览',
      loadApiPath: '',
      overlayButtonOpenText: '查看文件信息',
      overlayButtonCloseText: '关闭文件信息',
    };
  }

  // eslint-disable-next-line no-unused-vars
  supplementLoadRequestParams = (o) => {
    throw new Error('supplementLoadRequestParams need overrode to implement');
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程表单附件概览, 点击全屏按钮可以全屏查看',
        },
      ],
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldDataFlowCaseFormAttachment.alias.name,
    });
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseFormAttachmentId = (o) => {
    throw new Error('getFlowCaseFormAttachmentId need overrode to implement');
  };

  getFlowCaseFormAttachmentIdLabel = () => {
    throw new Error(
      'getFlowCaseFormAttachmentIdLabel need overrode to implement',
    );
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const fileType = getValueByKey({
      data: metaData,
      key: fieldDataFlowCaseFormAttachment.fileType.name,
      convert: convertCollection.number,
    });

    const suffix = getValueByKey({
      data: metaData,
      key: fieldDataFlowCaseFormAttachment.suffix.name,
      defaultValue: '',
    });

    const url = getValueByKey({
      data: metaData,
      key: fieldDataFlowCaseFormAttachment.url.name,
      defaultValue: '',
    });

    const existPdf = getValueByKey({
      data: metaData,
      key: fieldDataFlowCaseFormAttachment.existPdf.name,
      convert: convertCollection.number,
      defaultValue: 0,
    });

    const urlPdf = getValueByKey({
      data: metaData,
      key: fieldDataFlowCaseFormAttachment.urlPdf.name,
      defaultValue: '',
    });

    const isMedia = checkInCollection(
      [fileTypeCollection.audio, fileTypeCollection.video],
      fileType,
    );

    if (isMedia) {
      return buildPlayer({ url: url });
    }

    if (checkInCollection(['jpeg', 'jpg', 'png', 'gif'], toLower(suffix))) {
      return (
        <div
          style={{
            // width: '100%',
            padding: '20px',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <ImageBox fillHeight={false} showMode="contentImage" src={url} />
        </div>
      );
    }

    if (existPdf === whetherNumber.yes) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <FrameBox url={urlPdf} />
        </div>
      );
    }

    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <DocViewer
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
            csvDelimiter: ',', // "," as default,
            pdfZoom: {
              defaultZoom: 1.1, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
            pdfVerticalScrollByDefault: true, // false as default
          }}
          style={{ height: '100%' }}
          documents={[{ uri: url }]}
          initialActiveDocument={{ uri: url }}
        />
      </div>
    );
  };

  renderOverlayContent = () => {
    const { metaData } = this.state;

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          background: '#fff',
          padding: '16px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {buildCustomGrid({
          list: [
            {
              span: 2,
              label: fieldDataFlowCaseFormAttachment.alias.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.alias.name,
              }),
            },
            {
              span: 2,
              label: fieldDataFlowCaseFormAttachment.name.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.name.name,
              }),
            },
            {
              label: fieldDataFlowCaseFormAttachment.size.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.size.name,
              }),
            },
            {
              label: fieldDataFlowCaseFormAttachment.suffix.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.suffix.name,
              }),
            },
            {
              span: 2,
              label: fieldDataFlowCaseFormAttachment.url.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.url.name,
              }),
            },
            {
              span: 2,
              label: fieldDataFlowCaseFormAttachment.status.label,
              value: getFlowCaseFormAttachmentStatusName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseFormAttachment.status.name,
                }),
              }),
            },
            {
              label: fieldDataFlowCaseFormAttachment.createOperatorId.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.createOperatorId.name,
              }),
            },
            {
              label: fieldDataFlowCaseFormAttachment.createTime.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              label: this.getFlowCaseFormAttachmentIdLabel(metaData),
              value: this.getFlowCaseFormAttachmentId(metaData),
            },
            {
              label: fieldDataFlowCaseFormAttachment.updateTime.label,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCaseFormAttachment.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
          ],
          props: {
            bordered: true,
            size: 'small',
            column: 2,
            labelStyle: {
              width: '90px',
            },
            emptyValue: '暂无',
            ellipsis: false,
          },
        })}
      </div>
    );
  };
}

export { BaseAttachmentPreviewDrawer };
