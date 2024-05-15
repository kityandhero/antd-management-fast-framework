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
  getUserStatusName,
  getUserTypeName,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';
import { ResetPasswordModal } from '../ResetPasswordModal';
import { ResetSignetPasswordModal } from '../ResetSignetPasswordModal';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.user.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(accessWayCollection.user.get.permission),
      tab: '基本信息',
    },
    {
      key: 'userDepartmentInfo/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.userDepartmentInfo.pageList.permission,
      ),
      tab: '设置所属部门',
    },
    {
      key: 'userSubsidiaryInfo/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.userSubsidiaryInfo.pageList.permission,
      ),
      tab: '设置归属公司',
    },
    {
      key: 'signetInfo',
      hidden: !checkHasAuthority(accessWayCollection.user.setSignet.permission),
      tab: '设置印章',
    },
    {
      key: 'parentInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.user.updateBasicInfo.permission,
      ),
      tab: '设置上级',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.user.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
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

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  openResetPasswordModal = () => {
    ResetPasswordModal.open();
  };

  openResetSignetPasswordModal = () => {
    ResetSignetPasswordModal.open();
  };

  establishPageHeaderTitlePrefix = () => {
    return '用户';
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

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'setEnable',
          text: '启用用户',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '即将启用用户，确定吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '禁用用户',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '即将禁用用户，确定吗？',
          handleData: metaData,
        },
        {
          key: 'resetPassword',
          text: '重置登录密码',
          icon: iconBuilder.key(),
          handleButtonClick: () => {
            that.openResetPasswordModal();
          },
          handleData: metaData,
        },
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
            accessWayCollection.user.refreshCache.permission,
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
        label: fieldData.userId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.userId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.realName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.realName.name,
          defaultValue: '暂无',
        }),
      },
      {
        label: fieldData.gender.label,
        value: getGenderName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.gender.name,
            defaultValue: '暂未设置',
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
          defaultValue: '暂无',
        }),
      },
      {
        label: fieldData.noId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.noId.name,
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
        label: fieldData.address.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.address.name,
          defaultValue: '暂无',
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <ResetPasswordModal externalData={metaData} />

        <ResetSignetPasswordModal externalData={metaData} />
      </>
    );
  };
}

export default Detail;
