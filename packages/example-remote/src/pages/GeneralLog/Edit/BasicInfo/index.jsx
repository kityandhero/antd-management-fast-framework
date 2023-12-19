import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  cardConfig,
  dataTypeCollection,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ generalLog, schedulingControl }) => ({
  generalLog,
  schedulingControl,
}))
class Index extends TabPageBase {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'generalLog/get',
      generalLogId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { generalLogId } = this.state;

    d[fieldData.generalLogId.name] = generalLogId;

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
            text: '基本信息',
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
            text: '调用堆栈信息',
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
                  label: fieldData.ip.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.ip.name,
                  }),
                },
                {
                  span: 2,
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
                column: 4,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
              },
            },
          ],
        },
      ],
    };
  };
}

export default Index;
