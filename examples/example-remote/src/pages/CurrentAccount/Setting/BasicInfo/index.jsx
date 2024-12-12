import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig, getCorsDomain } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { fieldData } from '../../Common/data';
import MenuPageBase from '../../MenuPageBase';

@connect(({ currentAccount, schedulingControl }) => ({
  currentAccount,
  schedulingControl,
}))
class BasicInfo extends MenuPageBase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentAccount/get',
      submitApiPath: 'currentAccount/updateBasicInfo',
      avatar: '',
    };
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
    const avatar = getValueByKey({
      data: metaData,
      key: fieldData.avatar.name,
    });

    this.setState({ avatar: avatar || '' });
  };

  doAfterSubmitSuccess = ({
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    const that = this;

    that.reloadCurrentOperator({
      successCallback: () => {
        that.reloadByUrl();
      },
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;

    const { avatar } = this.state;

    d[fieldData.avatar.name] = avatar || '';

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ avatar: image });
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

      values[fieldData.email.name] = getValueByKey({
        data: metaData,
        key: fieldData.email.name,
      });

      values[fieldData.phone.name] = getValueByKey({
        data: metaData,
        key: fieldData.phone.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, avatar } = this.state;

    return {
      list: [
        {
          title: {
            text: '账户信息',
          },
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
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.loginName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.loginName.name,
              }),
            },
          ],
        },
        {
          title: {
            text: '基本信息',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.phone,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.email,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '头像上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: avatar,
              action: `${getCorsDomain()}/currentAccount/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
          ],
        },
      ],
    };
  };
}

export default BasicInfo;
