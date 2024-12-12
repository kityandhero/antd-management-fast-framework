import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import {
  buildUpdateTimeAndOperatorFieldItem,
  renderFormApplicationSourceCreateModeSelect,
  renderFormApplicationSourceTypeSelect,
} from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ applicationSource, schedulingControl }) => ({
  applicationSource,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority =
    accessWayCollection.applicationSource.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'applicationSource/get',
      submitApiPath: 'applicationSource/updateBasicInfo',
      applicationSourceId: null,
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { applicationSourceId, logo } = this.state;

    d.applicationSourceId = applicationSourceId;
    d.logo = logo;

    return d;
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

      values[fieldData.createMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.createMode.name,
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
              type: cardConfig.contentItemType.customSelect,
              component: renderFormApplicationSourceTypeSelect({}),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormApplicationSourceCreateModeSelect({}),
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
              action: `/applicationSource/uploadImage`,
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
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };
}

export default Index;
