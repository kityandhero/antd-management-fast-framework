import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ errorLog, schedulingControl }) => ({
  errorLog,
  schedulingControl,
}))
class Index extends TabPageBase {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'errorLog/get',
      errorLogId: null,
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
    const { errorLogId } = this.state;

    d[fieldData.errorLogId.name] = errorLogId;

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

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
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 4,
                  label: fieldData.message.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.message.name,
                  }),
                },
                {
                  span: 4,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
                {
                  span: 4,
                  label: fieldData.ancillaryInformation.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.ancillaryInformation.name,
                  }),
                },
                {
                  span: 4,
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
                column: 4,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
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
                  span: 4,
                  label: fieldData.exceptionTypeName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.exceptionTypeName.name,
                  }),
                },
                {
                  span: 4,
                  label: fieldData.exceptionTypeFullName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.exceptionTypeFullName.name,
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
                emptyStyle: {
                  color: '#ccc',
                },
              },
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
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.stackTrace.name,
                defaultValue: '',
                convert: convertCollection.string,
                formatBuilder: (v) => {
                  return v.replaceAll(new RegExp('\\r\\n', 'g'), '<br/>');
                },
              }),
            },
          ],
        },
      ],
    };
  };
}

export default Index;
