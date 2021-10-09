import { connect } from 'umi';
import { PictureOutlined } from '@ant-design/icons';

import { corsTarget, getValueByKey } from 'antd-management-fast-framework/es/utils/tools';
import { formContentConfig } from 'antd-management-fast-framework/es/utils/constants';
import BaseUpdateFormContent from 'antd-management-fast-framework/es/framework/DataForm/BaseUpdateFormContent';

import { fieldData } from '../../Common/data';

@connect(({ currentOperator, global, loading }) => ({
  currentOperator,
  global,
  loading: loading.models.currentOperator,
}))
class BaseView extends BaseUpdateFormContent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'currentOperator/getCurrentBasicInfo',
        submitApiPath: 'currentOperator/updateCurrentBasicInfo',
        avatar: '',
      },
    };
  }

  getApiData = (props) => {
    const {
      currentOperator: { data },
    } = props;

    return data;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    const avatar = getValueByKey({
      data: metaData,
      key: fieldData.avatar.name,
    });

    this.setState({ avatar: avatar || '' });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;

    const { avatar } = this.state;

    d.avatar = avatar || '';

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ avatar: image });
  };

  fillFormInitialValuesAfterLoad = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  formContentConfigData = () => {
    const { metaData, processing, dataLoading, avatar } = this.state;

    return {
      list: [
        {
          title: {
            text: '账户信息',
          },
          extra: {
            list: [
              {
                buildType: formContentConfig.cardExtraBuildType.refresh,
              },
              {
                buildType: formContentConfig.cardExtraBuildType.save,
              },
            ],
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 6,
              type: formContentConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.loginName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.loginName.name,
              }),
            },
            {
              lg: 6,
              type: formContentConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.cityName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.cityName.name,
              }),
            },
          ],
        },
        {
          title: {
            text: '基本信息',
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 6,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 6,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.email,
            },
            {
              lg: 6,
              type: formContentConfig.contentItemType.input,
              fieldData: fieldData.phone,
            },
          ],
        },
        {
          title: {
            icon: <PictureOutlined />,
            text: '头像上传',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: formContentConfig.contentItemType.imageUpload,
              image: avatar,
              action: `${corsTarget()}/currentOperator/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: '简介描述',
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export default BaseView;