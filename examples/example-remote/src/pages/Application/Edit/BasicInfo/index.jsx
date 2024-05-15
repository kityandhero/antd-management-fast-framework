import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { getApplicationTypeName } from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  goToUpdateWhenProcessed = true;

  componentAuthority = accessWayCollection.application.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'application/get',
      submitApiPath: 'application/updateBasicInfo',
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
    const { applicationId, logo } = this.state;

    d.applicationId = applicationId;
    d.logo = logo;

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
    const { logo } = metaData;

    this.setState({ logo });
  };

  afterUploadSuccess = (image) => {
    this.setState({ logo: image });
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.shortName.name] = getValueByKey({
        data: metaData,
        key: fieldData.shortName.name,
      });

      values[fieldData.type.name] = getValueByKey({
        data: metaData,
        key: fieldData.type.name,
        convert: convertCollection.string,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, logo } = this.state;

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
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.shortName,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.type,
              value: getApplicationTypeName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.type.name,
                }),
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.applicationSourceName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.applicationSourceName.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '设置应用图标',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: logo,
              action: `/application/uploadImage`,
              afterUploadSuccess: (image) => {
                this.afterUploadSuccess(image);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
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
                    format: formatCollection.datetime,
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
                    format: formatCollection.datetime,
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
