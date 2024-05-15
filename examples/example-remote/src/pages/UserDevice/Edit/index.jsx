import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getDeviceTypeName,
  getUserStatusName,
} from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ userDevice, schedulingControl }) => ({
  userDevice,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.userDevice.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(accessWayCollection.userDevice.get.permission),
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.userDevice.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'userDevice/get',
      backPath: `/person/userDevice/pageList/key`,
      userDeviceId: null,
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

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { userDeviceId } = this.state;

    d.userDeviceId = userDeviceId;

    return d;
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
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.nickname.name,
      }),
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  establishPageHeaderTitlePrefix = () => {
    return '设备';
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const avatar = getValueByKey({
      data: metaData,
      key: fieldData.avatar.name,
    });

    if (!checkStringIsNullOrWhiteSpace(avatar || '')) {
      return { src: avatar };
    }

    return null;
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const that = this;

    return {
      buttons: [
        {
          key: 'resetSignetPassword',
          text: '重置印章密码',
          icon: iconBuilder.key(),
          handleButtonClick: () => {
            that.openResetSignetPasswordModal();
          },
          handleData: metaData,
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.userDevice.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '当前状态',
      text: getUserStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
          convert: convertCollection.number,
        }),
      }),
      timeLabel: fieldData.createTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.createTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    return [
      {
        label: fieldData.userDeviceId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.userDeviceId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.loginName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.loginName.name,
          defaultValue: '暂无',
        }),
      },
      {
        label: fieldData.nickname.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.nickname.name,
          defaultValue: '暂无',
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
        label: fieldData.deviceCode.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.deviceCode.name,
          defaultValue: '暂无',
        }),
      },
      {
        label: fieldData.deviceType.label,
        value: getDeviceTypeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.deviceType.name,
            convert: convertCollection.string,
          }),
        }),
      },
    ];
  };
}

export default Detail;
