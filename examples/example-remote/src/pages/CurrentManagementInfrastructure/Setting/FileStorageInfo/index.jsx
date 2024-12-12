import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  toggleQiniuAudioSwitchAction,
  toggleQiniuFileSwitchAction,
  toggleQiniuImageSwitchAction,
  toggleQiniuVideoSwitchAction,
} from '../../Assist/action';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentManagementInfrastructure/get',
      submitApiPath: 'currentManagementInfrastructure/updateFileStorageInfo',
      qiniuImageSwitch: false,
      qiniuVideoSwitch: false,
      qiniuAudioSwitch: false,
      qiniuFileSwitch: false,
    };
  }

  supplementSubmitRequestParams = (o) => {
    const {
      qiniuImageSwitch,
      qiniuVideoSwitch,
      qiniuAudioSwitch,
      qiniuFileSwitch,
    } = this.state;

    return {
      ...o,
      qiniuImageSwitch: qiniuImageSwitch ? 1 : 0,
      qiniuVideoSwitch: qiniuVideoSwitch ? 1 : 0,
      qiniuAudioSwitch: qiniuAudioSwitch ? 1 : 0,
      qiniuFileSwitch: qiniuFileSwitch ? 1 : 0,
    };
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
    const qiniuImageSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.qiniu.qiniuImageSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes;

    const qiniuVideoSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.qiniu.qiniuVideoSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes;

    const qiniuAudioSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.qiniu.qiniuAudioSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes;

    const qiniuFileSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.qiniu.qiniuFileSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes;

    this.setState({
      qiniuImageSwitch,
      qiniuVideoSwitch,
      qiniuAudioSwitch,
      qiniuFileSwitch,
    });
  };

  onQiniuImageSwitchSwitchChange = () => {
    const { metaData } = this.state;

    toggleQiniuImageSwitchAction({
      target: this,
      handleData: metaData,
    });
  };

  onQiniuVideoSwitchSwitchChange = () => {
    const { metaData } = this.state;

    toggleQiniuVideoSwitchAction({
      target: this,
      handleData: metaData,
    });
  };

  onQiniuAudioSwitchSwitchChange = () => {
    const { metaData } = this.state;

    toggleQiniuAudioSwitchAction({
      target: this,
      handleData: metaData,
    });
  };

  onQiniuFileSwitchSwitchChange = () => {
    const { metaData } = this.state;

    toggleQiniuFileSwitchAction({
      target: this,
      handleData: metaData,
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
      values[fieldData.fileHost.name] = getValueByKey({
        data: metaData,
        key: fieldData.fileHost.name,
      });

      values[fieldData.imageUploadMaxSize.name] = getValueByKey({
        data: metaData,
        key: fieldData.imageUploadMaxSize.name,
      });

      values[fieldData.videoUploadMaxSize.name] = getValueByKey({
        data: metaData,
        key: fieldData.videoUploadMaxSize.name,
      });

      values[fieldData.audioUploadMaxSize.name] = getValueByKey({
        data: metaData,
        key: fieldData.audioUploadMaxSize.name,
      });

      values[fieldData.fileUploadMaxSize.name] = getValueByKey({
        data: metaData,
        key: fieldData.fileUploadMaxSize.name,
      });

      values[fieldData.qiniu.accessKey.name] = getValueByKey({
        data: metaData,
        key: fieldData.qiniu.accessKey.name,
      });

      values[fieldData.qiniu.secretKey.name] = getValueByKey({
        data: metaData,
        key: fieldData.qiniu.secretKey.name,
      });

      values[fieldData.qiniu.bucket.name] = getValueByKey({
        data: metaData,
        key: fieldData.qiniu.bucket.name,
      });

      values[fieldData.qiniu.rootUrl.name] = getValueByKey({
        data: metaData,
        key: fieldData.qiniu.rootUrl.name,
      });

      values[fieldData.qiniu.qiniuImageSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.qiniu.qiniuImageSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;

      values[fieldData.qiniu.qiniuVideoSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.qiniu.qiniuVideoSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;

      values[fieldData.qiniu.qiniuAudioSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.qiniu.qiniuAudioSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;

      values[fieldData.qiniu.qiniuFileSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.qiniu.qiniuFileSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const localStorage = getValueByKey({
      data: metaData,
      key: fieldData.localStorage.name,
      formatBuilder: (v) => {
        return `${v}`;
      },
    });

    const generalStorage = getValueByKey({
      data: metaData,
      key: fieldData.generalStorage.name,
      formatBuilder: (v) => {
        return `/${v}/`;
      },
    });

    const imageStorage = getValueByKey({
      data: metaData,
      key: fieldData.imageStorage.name,
      formatBuilder: (v) => {
        return `${generalStorage}${v}/`;
      },
    });

    const videoStorage = getValueByKey({
      data: metaData,
      key: fieldData.videoStorage.name,
      formatBuilder: (v) => {
        return `${generalStorage}${v}/`;
      },
    });

    const audioStorage = getValueByKey({
      data: metaData,
      key: fieldData.audioStorage.name,
      formatBuilder: (v) => {
        return `${generalStorage}${v}/`;
      },
    });

    const fileStorage = getValueByKey({
      data: metaData,
      key: fieldData.fileStorage.name,
      formatBuilder: (v) => {
        return `${generalStorage}${v}/`;
      },
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '本地存储配置',
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
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.fileHost,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.imageUploadMaxSize,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.videoUploadMaxSize,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.audioUploadMaxSize,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.fileUploadMaxSize,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.localStorage,
              value: localStorage,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.generalStorage,
              value: generalStorage,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.imageStorage,
              value: imageStorage,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.videoStorage,
              value: videoStorage,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.audioStorage,
              value: audioStorage,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.fileStorage,
              value: fileStorage,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '七牛云配置与转存设置',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.qiniu.accessKey,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.qiniu.secretKey,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.qiniu.bucket,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.qiniu.rootUrl,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '配置七牛云转存',
            subText:
              '[开启七牛云转存上传文件时请提交完善的七牛云配置信息, 否则将引发上传异常!]',
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
              fieldData: fieldData.qiniu.qiniuImageSwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onQiniuImageSwitchSwitchChange,
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.qiniu.qiniuVideoSwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onQiniuVideoSwitchSwitchChange,
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.qiniu.qiniuAudioSwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onQiniuAudioSwitchSwitchChange,
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.qiniu.qiniuFileSwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onQiniuFileSwitchSwitchChange,
              },
            },
          ],
        },
      ],
    };
  };

  buildFormContentHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处的七牛云配置用于存储系统相关的文件资源，与开户的各个平台之间的七牛云配置作用不同，请勿混淆。',
        },
      ],
    };
  };
}

export default Index;
