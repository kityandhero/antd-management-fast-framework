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
  getGenderName,
  getUserTypeName,
} from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.user.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      show: checkHasAuthority(accessWayCollection.user.get.permission),
      tab: '基本信息',
    },
    {
      key: 'updateParent',
      show: checkHasAuthority(
        accessWayCollection.user.updateBasicInfo.permission,
      ),
      tab: '设置上级',
    },
    {
      key: 'operateLog/pageList',
      show: checkHasAuthority(accessWayCollection.user.operateLog.permission),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用户：',
      loadApiPath: 'user/get',
      backPath: `/person/user/pageList/key`,
      userId: null,
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
    const { userId } = this.state;

    d.userId = userId;

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
    return '用户';
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const headImageUrl = getValueByKey({
      data: metaData,
      key: fieldData.headImageUrl.name,
    });

    if (!checkStringIsNullOrWhiteSpace(headImageUrl || '')) {
      return { src: headImageUrl };
    }

    return null;
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
            accessWayCollection.user.refreshCache.permission,
          ),
          confirm: {
            title: '即将刷新缓存，确定吗？',
          },
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '当前状态',
      text: '正常',
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
        label: fieldData.userId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.userId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.type.label,
        value: getGenderName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.sex.name,
          }),
        }),
      },
      {
        label: fieldData.type.label,
        value: getUserTypeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.type.name,
          }),
        }),
      },
      {
        label: fieldData.phone.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.phone.name,
        }),
      },
      {
        label: fieldData.noId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.noId.name,
        }),
      },
      {
        label: fieldData.email.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.email.name,
        }),
      },
      {
        label: fieldData.address.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.address.name,
        }),
      },
    ];
  };
}

export default Detail;
