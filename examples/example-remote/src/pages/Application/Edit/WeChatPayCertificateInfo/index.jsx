import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { renderFormApplicationCertificateTypeSelect } from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class WeChatPayCertificateInfo extends TabPageBase {
  goToUpdateWhenProcessed = true;

  componentAuthority = accessWayCollection.application.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'application/get',
      submitApiPath: 'application/updateWeChatPayCertificateInfo',
      applicationId: null,
      logo: '',
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
    const { applicationId, certificate } = this.state;

    d.applicationId = applicationId;
    d.certificate = certificate;

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
    const { certificate } = metaData;

    this.setState({ certificateSummary: certificate });
  };

  afterUploadSuccess = (certificate) => {
    this.setState({ certificate });
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
      values[fieldData.certificate.name] = '';
      values[fieldData.certificatePassword.name] = '';
      values[fieldData.certificateType.name] = null;
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, certificate } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.certificate.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.certificate.name,
                  }),
                },
                {
                  label: fieldData.certificatePassword.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.certificatePassword.name,
                  }),
                },
                {
                  label: fieldData.certificateTypeNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.certificateTypeNote.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '100px',
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
            text: '更新证书信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.fileBase64Upload,
              fieldData: fieldData.certificate,
              fileBase64: certificate,
              action: `/application/uploadCertificate`,
              afterUploadSuccess: (image) => {
                this.afterUploadSuccess(image);
              },
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.certificatePassword,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormApplicationCertificateTypeSelect({}),
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
          text: '设置微信支付信息。',
        },
      ],
    };
  };
}

export default WeChatPayCertificateInfo;
