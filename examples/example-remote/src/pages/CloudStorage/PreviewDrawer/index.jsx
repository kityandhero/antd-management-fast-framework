import DocViewer from '@cyntler/react-doc-viewer';

import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { buildCustomGrid, buildPlayer } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fileTypeCollection } from '../../../customConfig';
import {
  getCloudStorageSourceTypeName,
  getCloudStorageStatusName,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'fa0fa13a73854386a628932b435df584';

@connect(({ cloudStorage, schedulingControl }) => ({
  cloudStorage,
  schedulingControl,
}))
class PreviewDrawer extends BaseVerticalFlexDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '文件预览',
      loadApiPath: 'cloudStorage/get',
      overlayButtonOpenText: '查看文件信息',
      overlayButtonCloseText: '关闭文件信息',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.cloudStorageId = getValueByKey({
      data: externalData,
      key: fieldData.cloudStorageId.name,
    });

    return d;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此窗口显示的是文件预览, 点击全屏按钮可以全屏查看',
        },
      ],
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.alias.name,
    });
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const fileType = getValueByKey({
      data: metaData,
      key: fieldData.fileType.name,
      convert: convertCollection.number,
    });

    const isMedia = checkInCollection(
      [fileTypeCollection.audio, fileTypeCollection.video],
      fileType,
    );

    if (isMedia) {
      return buildPlayer({
        url: getValueByKey({
          data: metaData,
          key: fieldData.url.name,
        }),
      });
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
          documents={[
            {
              uri: getValueByKey({
                data: metaData,
                key: fieldData.url.name,
              }),
            },
          ]}
          initialActiveDocument={{
            uri: getValueByKey({
              data: metaData,
              key: fieldData.url.name,
            }),
          }}
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
              label: fieldData.alias.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.alias.name,
              }),
            },
            {
              span: 2,
              label: fieldData.name.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.name.name,
              }),
            },
            {
              label: fieldData.size.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.size.name,
              }),
            },
            {
              label: fieldData.suffix.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.suffix.name,
              }),
            },
            {
              span: 2,
              label: fieldData.url.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.url.name,
              }),
            },
            {
              span: 1,
              label: fieldData.sourceType.label,
              value: getCloudStorageSourceTypeName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.sourceType.name,
                  convert: convertCollection.string,
                }),
              }),
            },
            {
              span: 1,
              label: fieldData.status.label,
              value: getCloudStorageStatusName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.status.name,
                }),
              }),
            },
            {
              label: fieldData.createOperatorId.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createOperatorId.name,
              }),
            },
            {
              label: fieldData.createTime.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              label: fieldData.cloudStorageId.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.cloudStorageId.name,
              }),
            },
            {
              label: fieldData.updateTime.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
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

export { PreviewDrawer };
