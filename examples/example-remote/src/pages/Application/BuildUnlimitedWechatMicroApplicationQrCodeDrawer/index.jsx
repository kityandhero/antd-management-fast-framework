import { connect } from 'easy-soft-dva';
import { getValueByKey, whetherString } from 'easy-soft-utility';

import { cardConfig, extraBuildType } from 'antd-management-fast-common';
import {
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getUnlimitedWechatMicroApplicationQrCodeAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseNeedlessLoadDrawer } = DataDrawer;

const visibleFlag = '916b5f1f-1245-4190-b547-56ac5d4bd678';

@connect(({ applicationNavigation, schedulingControl }) => ({
  applicationNavigation,
  schedulingControl,
}))
class BuildUnlimitedWechatMicroApplicationQrCodeDrawer extends BaseNeedlessLoadDrawer {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  componentAuthority =
    accessWayCollection.application.getUnlimitedWechatMicroApplicationQrCode
      .permission;

  wechatMicroApplicationQrCodePage = '';

  wechatMicroApplicationQrCodeScene = '';

  wechatMicroApplicationQrCodeCheckPath = whetherString.yes;

  wechatMicroApplicationQrCodeEnvVersion = '';

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '构建小程序码',
      imageBase64: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.applicationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationId.name,
    });

    return d;
  };

  getUnlimitedWechatMicroApplicationQrCode = (o) => {
    getUnlimitedWechatMicroApplicationQrCodeAction({
      target: this,
      handleData: {
        ...o,
        page: this.wechatMicroApplicationQrCodePage,
        scene: this.wechatMicroApplicationQrCodeScene,
        envVersion: this.wechatMicroApplicationQrCodeEnvVersion,
        checkPath: this.wechatMicroApplicationQrCodeCheckPath,
        width: this.wechatMicroApplicationQrCodeSize,
      },
      successCallback: ({ target, remoteData }) => {
        const wechatMicroApplicationQrCode = getValueByKey({
          data: remoteData,
          key: fieldData.wechatMicroApplicationQrCode.name,
        });

        target.setState({
          imageBase64: wechatMicroApplicationQrCode,
        });
      },
    });
  };

  onPageChange = (v) => {
    this.wechatMicroApplicationQrCodePage = v;
  };

  onSceneChange = (v) => {
    this.wechatMicroApplicationQrCodeScene = v;
  };

  // eslint-disable-next-line no-unused-vars
  onEnvVersionChange = (v, option) => {
    this.wechatMicroApplicationQrCodeEnvVersion = v;
  };

  // eslint-disable-next-line no-unused-vars
  onCheckPathChange = (v, option) => {
    this.wechatMicroApplicationQrCodeCheckPath = v;
  };

  onSizeChange = (v) => {
    this.wechatMicroApplicationQrCodeSize = v;
  };

  establishExtraActionConfig = () => {
    const { externalData } = this.state;

    const applicationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationId.name,
    });

    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.qrCode(),
          text: '立即构建',
          disabled: this.checkInProgress(),
          handleClick: () => {
            that.getUnlimitedWechatMicroApplicationQrCode({
              applicationId,
            });
          },
        },
      ],
    };
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.envVersion.name] = 'release';
    initialValues[fieldData.checkPath.name] = whetherString.yes;
    initialValues[fieldData.qrCodeSize.name] = 430;

    return initialValues;
  };

  establishCardCollectionConfig = () => {
    const { imageBase64 } = this.state;

    const that = this;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.page,
              require: false,
              innerProps: {
                onChange: (event) => {
                  const {
                    target: { value: v },
                  } = event;

                  that.onPageChange(v);
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.scene,
              require: false,
              innerProps: {
                onChange: (event) => {
                  const {
                    target: { value: v },
                  } = event;

                  that.onSceneChange(v);
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.envVersion,
              listData: [
                {
                  value: 'release',
                  label: '正式版',
                },
                {
                  value: 'trial',
                  label: '体验版',
                },
                {
                  value: 'develop',
                  label: '开发版',
                },
              ],
              dataConvert: convertOptionOrRadioData,
              require: true,
              onChange: this.onEnvVersionChange,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.checkPath,
              listData: [
                {
                  value: whetherString.yes,
                  label: '校验',
                },
                {
                  value: whetherString.no,
                  label: '不校验',
                },
              ],
              dataConvert: convertOptionOrRadioData,
              require: true,
              onChange: this.onCheckPathChange,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.qrCodeSize,
              require: false,
              innerProps: {
                onChange: (v) => {
                  that.onSizeChange(v);
                },
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '二维码Base64值',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowTextarea,
              fieldData: fieldData.wechatMicroApplicationQrCode,
              value: imageBase64,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '二维码图片',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageShow,
              fieldData: fieldData.wechatMicroApplicationQrCode,
              image: imageBase64,
              imageBoxContainorStyle: {
                width: '160px',
              },
            },
          ],
        },
      ],
    };
  };
}

export { BuildUnlimitedWechatMicroApplicationQrCodeDrawer };
