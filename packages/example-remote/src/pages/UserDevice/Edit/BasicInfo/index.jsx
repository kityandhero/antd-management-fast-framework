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
import { getDeviceTypeName } from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ userDevice, schedulingControl }) => ({
  userDevice,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.userDevice.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'userDevice/get',
      userDeviceId: null,
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
    const { userDeviceId, avatar } = this.state;

    d[fieldData.userDeviceId.name] = userDeviceId;
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

      values[fieldData.birthday.name] = createDayJsDatetime(
        getValueByKey({
          data: metaData,
          key: fieldData.birthday.name,
        }),
        'YYYY-MM-DD',
      );
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

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
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 1,
                  label: fieldData.loginName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.loginName.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.realName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.realName.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.nickname.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.realName.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.phone.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.phone.name,
                  }),
                },
                {
                  span: 3,
                  label: fieldData.deviceCode.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.deviceCode.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.deviceType.label,
                  value: getDeviceTypeName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.deviceType.name,
                    }),
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
                  span: 3,
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
                  span: 3,
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
