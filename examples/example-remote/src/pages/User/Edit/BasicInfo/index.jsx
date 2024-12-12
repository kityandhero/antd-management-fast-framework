import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  createDayJsDatetime,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { renderFormGenderSelect } from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority = accessWayCollection.user.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'user/get',
      submitApiPath: 'user/updateBasicInfo',
      userId: null,
      avatar: '',
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

    this.setState({ avatar });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId, avatar } = this.state;

    d[fieldData.userId.name] = userId;
    d[fieldData.avatar.name] = avatar;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ avatar: image });
  };

  fillInitialValuesAfterLoad = ({
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
      values[fieldData.nickname.name] = getValueByKey({
        data: metaData,
        key: fieldData.nickname.name,
      });

      values[fieldData.realName.name] = getValueByKey({
        data: metaData,
        key: fieldData.realName.name,
      });

      values[fieldData.phone.name] = getValueByKey({
        data: metaData,
        key: fieldData.phone.name,
      });

      values[fieldData.email.name] = getValueByKey({
        data: metaData,
        key: fieldData.email.name,
      });

      values[fieldData.gender.name] = getValueByKey({
        data: metaData,
        key: fieldData.gender.name,
        convert: convertCollection.string,
      });

      values[fieldData.identityNumber.name] = getValueByKey({
        data: metaData,
        key: fieldData.identityNumber.name,
      });

      values[fieldData.birthday.name] = createDayJsDatetime({
        datetime: getValueByKey({
          data: metaData,
          key: fieldData.birthday.name,
        }),
        format: 'YYYY-MM-DD',
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
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.loginName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.loginName.name,
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.nickname,
              value: getValueByKey({
                data: metaData,
                key: fieldData.nickname.name,
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.realName,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.phone,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.email,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderFormGenderSelect({
                required: false,
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.identityNumber,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.datePicker,
              fieldData: fieldData.birthday,
              innerProps: {
                showTime: false,
                format: 'YYYY-MM-DD',
              },
              require: false,
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
            text: '其他信息',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.provinceName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.provinceName.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  label: fieldData.cityName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.cityName.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  label: fieldData.districtName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.districtName.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  span: 3,
                  label: fieldData.address.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.address.name,
                    defaultValue: '暂无',
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 3,
                labelStyle: {
                  width: '160px',
                },
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '上级用户信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.parentId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.parentId.name,
                  }),
                },
                {
                  label: fieldData.parentNickname.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.parentNickname.name,
                  }),
                },
                {
                  label: fieldData.parentRealName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.parentRealName.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 3,
                labelStyle: {
                  width: '160px',
                },
              },
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
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
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
