import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig, dataTypeCollection } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '4f7c6a37b1a24e09a0db986b32eab4c6';

@connect(({ generalLog, schedulingControl }) => ({
  generalLog,
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
      loadApiPath: 'generalLog/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.generalLogId = getValueByKey({
      data: externalData,
      key: fieldData.generalLogId.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const messageType = getValueByKey({
      data: metaData,
      key: fieldData.messageType.name,
      convert: convertCollection.number,
    });

    const contentType = getValueByKey({
      data: metaData,
      key: fieldData.contentType.name,
      convert: convertCollection.number,
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.message.name,
              }),
              hidden: !checkInCollection(
                [
                  dataTypeCollection.jsonObject.flag,
                  dataTypeCollection.jsonObjectList.flag,
                ],
                messageType,
              ),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.message.name,
                defaultValue: '',
                formatBuilder: (v) => {
                  return v.replaceAll(new RegExp('\\r\\n', 'g'), '<br/>');
                },
              }),
              hidden: checkInCollection(
                [
                  dataTypeCollection.jsonObject.flag,
                  dataTypeCollection.jsonObjectList.flag,
                ],
                messageType,
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '信息内容',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.content.name,
              }),
              hidden: !checkInCollection(
                [
                  dataTypeCollection.jsonObject.flag,
                  dataTypeCollection.jsonObjectList.flag,
                ],
                contentType,
              ),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.content.name,
                defaultValue: '',
                formatBuilder: (v) => {
                  return v.replaceAll(new RegExp('\\r\\n', 'g'), '<br/>');
                },
              }),
              hidden: checkInCollection(
                [
                  dataTypeCollection.jsonObject.flag,
                  dataTypeCollection.jsonObjectList.flag,
                ],
                contentType,
              ),
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
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
                {
                  label: fieldData.ancillaryInformation.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.ancillaryInformation.name,
                  }),
                },
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
