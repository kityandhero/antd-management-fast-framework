import { connect } from 'easy-soft-dva';
import { formatCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '7c2bbc50611a496bad27b0e340c2deba';

@connect(({ executeLog, schedulingControl }) => ({
  executeLog,
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
      pageTitle: '日志摘要信息',
      loadApiPath: 'executeLog/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.executeLogId = getValueByKey({
      data: externalData,
      key: fieldData.executeLogId.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '方法定义信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.name.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.name.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.declaringTypeName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.declaringTypeName.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.declaringTypeNamespace.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.declaringTypeNamespace.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.resultType.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.resultType.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.executeTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.executeTime.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.resultTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.resultTime.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '120px',
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
            text: '方法参数',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.parametersJson.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '方法执行结果',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.resultJson.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.channelNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.channelNote.name,
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
      ],
    };
  };
}

export { PreviewDrawer };
