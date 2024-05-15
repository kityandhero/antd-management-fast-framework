import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { getBusinessModeName } from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

const {
  Whether: { getWhetherName },
} = FunctionSupplement;

@connect(({ yonYouPushMessage, schedulingControl }) => ({
  yonYouPushMessage,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.yonYouPushMessage.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'yonYouPushMessage/get',
      yonYouPushMessageId: null,
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

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
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
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.serialNumber.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.serialNumber.name,
                  }),
                },
                {
                  label: fieldData.personnelCode.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.personnelCode.name,
                  }),
                },
                {
                  label: fieldData.businessMode.label,
                  value: getBusinessModeName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.businessMode.name,
                    }),
                  }),
                },
                {
                  label: fieldData.pushTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.pushTime.name,
                  }),
                },
                {
                  span: 3,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.sendComplete.label,
                  value: getWhetherName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.sendComplete.name,
                    }),
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
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 4,
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
            text: '操作信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 1,
                  label: fieldData.createOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createOperatorId.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.updateOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateOperatorId.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.updateTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateTime.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 4,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '80px',
                },
              },
            },
          ],
        },
      ],
    };
  };
}

export default BasicInfo;
