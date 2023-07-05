import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import TabPageBase from '../../TabPageBase';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.user.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'user/get',
      userId: null,
      headImageUrl: '',
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
    const headImageUrl = getValueByKey({
      data: metaData,
      key: fieldData.headImageUrl.name,
    });

    this.setState({ headImageUrl });
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

    return values;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;

    d.userId = userId;

    return d;
  };

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { userId } = this.state;

    if (!checkStringIsNullOrWhiteSpace(userId)) {
      d.userId = userId;
    }

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData, headImageUrl } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
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
                  label: fieldData.nickname.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.nickname.name,
                  }),
                },
                {
                  label: fieldData.phone.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.phone.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  label: fieldData.email.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.email.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  label: fieldData.birthday.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.birthday.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  label: fieldData.sex.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sex.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  label: fieldData.province.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.province.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  label: fieldData.city.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.city.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  span: 2,
                  label: fieldData.address.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.address.name,
                    defaultValue: '暂无',
                  }),
                },
                {
                  span: 3,
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
                  }),
                },
              ],
              props: {
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
            icon: iconBuilder.picture(),
            text: '用户头像',
          },
          items: [
            {
              type: cardConfig.contentItemType.imageShow,
              image: headImageUrl,
              imageBoxContainorStyle: {
                width: '140px',
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
                bordered: true,
                column: 3,
                labelStyle: {
                  width: '160px',
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
