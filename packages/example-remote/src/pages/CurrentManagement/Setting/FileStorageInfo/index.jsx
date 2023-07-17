import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { fieldData } from '../../Common/data';
import TabPageBase from '../../TabPageBase';

@connect(({ currentManagement, schedulingControl }) => ({
  currentManagement,
  schedulingControl,
}))
class Index extends TabPageBase {
  goToUpdateWhenProcessed = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentManagement/get',
      submitApiPath: 'currentManagement/updateFileStorageInfo',
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

  onQiniuImageSwitchSwitchChange = (v) => {
    this.setState({
      qiniuImageSwitch: v,
    });
  };

  onQiniuVideoSwitchSwitchChange = (v) => {
    this.setState({
      qiniuVideoSwitch: v,
    });
  };

  onQiniuAudioSwitchSwitchChange = (v) => {
    this.setState({
      qiniuAudioSwitch: v,
    });
  };

  onQiniuFileSwitchSwitchChange = (v) => {
    this.setState({
      qiniuFileSwitch: v,
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
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const {
      metaData,
      qiniuImageSwitch,
      qiniuVideoSwitch,
      qiniuAudioSwitch,
      qiniuFileSwitch,
    } = this.state;

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
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '配置七牛云转存',
              innerProps: {
                orientation: 'left',
                style: {
                  margin: '4px 0 24px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.qiniu.qiniuImageSwitch,
              checked: qiniuImageSwitch,
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
              checked: qiniuVideoSwitch,
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
              checked: qiniuAudioSwitch,
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
              checked: qiniuFileSwitch,
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
