import { connect } from 'easy-soft-dva';
import { formatCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ executeLog, schedulingControl }) => ({
  executeLog,
  schedulingControl,
}))
class Index extends TabPageBase {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'executeLog/get',
      executeLogId: null,
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
    const { executeLogId } = this.state;

    d[fieldData.executeLogId.name] = executeLogId;

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
                  label: fieldData.name.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.name.name,
                  }),
                },
                {
                  label: fieldData.declaringTypeName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.declaringTypeName.name,
                  }),
                },
                {
                  label: fieldData.declaringTypeNamespace.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.declaringTypeNamespace.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 1,
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
