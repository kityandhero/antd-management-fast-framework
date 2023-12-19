import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { toggleSignetPasswordSwitchAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class SignetInfo extends TabPageBase {
  componentAuthority = accessWayCollection.user.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'user/get',
      submitApiPath: 'user/setSignet',
      userId: null,
      signet: '',
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
    const { userId, signet } = this.state;

    d[fieldData.userId.name] = userId;
    d[fieldData.signet.name] = signet;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ signet: image });
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const signet = getValueByKey({
      data: metaData,
      key: fieldData.signet.name,
    });

    this.setState({ signet });
  };

  onSwitchChange = () => {
    this.openSignetPasswordSwitch();
  };

  openSignetPasswordSwitch = () => {
    const { metaData } = this.state;

    toggleSignetPasswordSwitchAction({
      target: this,
      handleData: metaData,
      successCallback: ({ target, remoteData }) => {
        metaData[fieldData.signetPasswordSwitch.name] = getValueByKey({
          data: remoteData,
          key: fieldData.signetPasswordSwitch.name,
        });

        target.setState({ metaData });
      },
    });
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
      values[fieldData.signetPasswordSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.signetPasswordSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { signet } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.picture(),
            text: '印章信息',
            subText: '[上传后需点击保存按钮保存!]',
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
              type: cardConfig.contentItemType.imageUpload,
              image: signet,
              action: `/user/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '印章密码开关',
            subText: '[启用密码时请确保已经设置印章密码!]',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '点击开关即可生效',
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.signetPasswordSwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onSwitchChange,
              },
            },
          ],
        },
      ],
    };
  };
}

export default SignetInfo;
