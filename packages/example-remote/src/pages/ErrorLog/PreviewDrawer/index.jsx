import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '4b04425da2f94bdcb96027c2cfc8d549';

@connect(({ errorLog, schedulingControl }) => ({
  errorLog,
  schedulingControl,
}))
class PreviewDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '异常摘要信息',
      loadApiPath: 'errorLog/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.errorLogId = getValueByKey({
      data: externalData,
      key: fieldData.errorLogId.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.message.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.message.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.ancillaryInformation.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.ancillaryInformation.name,
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
                  label: fieldData.source.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.source.name,
                  }),
                },
                {
                  label: fieldData.userId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.userId.name,
                  }),
                },
                {
                  label: fieldData.scene.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.scene.name,
                  }),
                },
                {
                  label: fieldData.host.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.host.name,
                  }),
                },
                {
                  label: fieldData.port.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.port.name,
                  }),
                },
                {
                  label: fieldData.ip.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.ip.name,
                  }),
                },
                {
                  label: fieldData.log.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.log.name,
                  }),
                },
                {
                  label: fieldData.autoRemark.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.autoRemark.name,
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
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '异常信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.exceptionTypeName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.exceptionTypeName.name,
                  }),
                },
                {
                  label: fieldData.exceptionTypeFullName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.exceptionTypeFullName.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 1,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '堆栈信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.stackTrace.name,
                defaultValue: '',
                formatBuilder: (v) => {
                  return v.replaceAll(new RegExp('\\r\\n', 'g'), '<br/>');
                },
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: `${fieldData.header.label}信息`,
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
                size: 'small',
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.headerJson.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: `${fieldData.urlParams.label}信息`,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,

              value: getValueByKey({
                data: metaData,
                key: fieldData.urlParamsJson.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: `${fieldData.payloadParams.label}信息`,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.payloadParamsJson.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: `${fieldData.formParams.label}信息`,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.formParamsJson.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: `${fieldData.data.label}信息`,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.data.name,
              }),
            },
          ],
        },
      ],
    };
  };
}

export { PreviewDrawer };
