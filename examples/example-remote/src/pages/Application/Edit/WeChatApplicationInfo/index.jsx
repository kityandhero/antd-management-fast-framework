import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, toNumber } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { renderFormApplicationMerchantTypeSelect } from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class WeChatApplicationInfo extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority = accessWayCollection.application.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'application/get',
      submitApiPath: 'application/updateWeChatApplicationInfo',
      applicationId: null,
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
    const { applicationId } = this.state;

    d.applicationId = applicationId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const { merchantType } = metaData;

    this.setState({ merchantType: `${merchantType || 0}` });
  };

  onMerchantTypeChange = (event) => {
    const merchantType = `${event}`;

    this.setState({ merchantType });

    if (toNumber(merchantType) === 0) {
      this.setFormFieldsValue({
        subAppId: '',
        subAppSecret: '',
        subMerchantId: '',
      });
    }
  };

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

    if (metaData != null) {
      values[fieldData.appId.name] = getValueByKey({
        data: metaData,
        key: fieldData.appId.name,
      });

      values[fieldData.appSecret.name] = getValueByKey({
        data: metaData,
        key: fieldData.appSecret.name,
      });

      values[fieldData.appKey.name] = getValueByKey({
        data: metaData,
        key: fieldData.appKey.name,
      });

      values[fieldData.merchantId.name] = getValueByKey({
        data: metaData,
        key: fieldData.merchantId.name,
      });

      values[fieldData.merchantType.name] = getValueByKey({
        data: metaData,
        key: fieldData.merchantType.name,
        convert: convertCollection.string,
      });

      values[fieldData.subAppId.name] = getValueByKey({
        data: metaData,
        key: fieldData.subAppId.name,
      });

      values[fieldData.subAppSecret.name] = getValueByKey({
        data: metaData,
        key: fieldData.subAppSecret.name,
      });

      values[fieldData.subMerchantId.name] = getValueByKey({
        data: metaData,
        key: fieldData.subMerchantId.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, merchantType } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '微信应用信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormApplicationMerchantTypeSelect({
                onChange: this.onMerchantTypeChange,
              }),
            },
            {
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.appId,
            },
            {
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.appSecret,
            },
            {
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.appKey,
            },
            {
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.merchantId,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '服务商模式专用',
            },
            {
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subAppId,
              innerProps: {
                disabled: toNumber(merchantType) === 0,
              },
            },
            {
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subAppSecret,
              innerProps: {
                disabled: toNumber(merchantType) === 0,
              },
            },
            {
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subMerchantId,
              innerProps: {
                disabled: toNumber(merchantType) === 0,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.clock(),
            text: 'AccessToken信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.accessToken.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.accessToken.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.accessTokenExpireTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.accessTokenExpireTime.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.accessTokenValidSecond.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.accessTokenValidSecond.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '196px',
                },
                emptyValue: '暂无',
                emptyStyle: {
                  color: '#ccc',
                },
              },
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '设置微信应用配置信息。',
        },
      ],
    };
  };
}

export default WeChatApplicationInfo;
