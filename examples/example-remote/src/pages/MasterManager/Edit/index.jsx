import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getMasterManagerStatusName,
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
import { UpdateRoleModal } from '../ChangeRoleModal';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ masterManager, schedulingControl }) => ({
  masterManager,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.masterManager.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.masterManager.get.permission,
      ),
      tab: '基本信息',
    },
    {
      key: 'loginLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.masterManagerLoginLog.pageList.permission,
      ),
      tab: '登录记录',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.masterManager.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'masterManager/get',
      backPath: `/account/masterManager/pageList/key`,
      masterManagerId: null,
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
    const { masterManagerId } = this.state;

    d.masterManagerId = masterManagerId;

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
        key: fieldData.loginName.name,
      }),
    });
  };

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r, // eslint-disable-next-line no-unused-vars
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
      handleData: r, // eslint-disable-next-line no-unused-vars
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

  showUpdateRoleModal = () => {
    UpdateRoleModal.open();
  };

  afterUpdateRoleModalOk = ({
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    this.reloadData({});
  };

  establishPageHeaderTitlePrefix = () => {
    return '账户';
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
          key: 'changePermission',
          text: '变更权限',
          icon: iconBuilder.edit(),
          handleButtonClick: () => {
            that.showUpdateRoleModal();
          },
          handleData: metaData,
        },
        {
          key: 'setEnable',
          text: '启用账户',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '即将启用账户，确定吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '禁用账户',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '即将禁用账户，确定吗？',
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
          case 'setEnable': {
            that.setEnable(handleData);
            break;
          }

          case 'setDisable': {
            that.setDisable(handleData);
            break;
          }

          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage('can not find matched key');
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
            accessWayCollection.masterManager.refreshCache.permission,
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
      text: getMasterManagerStatusName({
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
        label: fieldData.masterManagerId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.masterManagerId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.name.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.name.name,
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
        label: fieldData.email.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.email.name,
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    const masterManagerId = getValueByKey({
      data: metaData,
      key: fieldData.masterManagerId.name,
    });

    return (
      <>
        <UpdateRoleModal
          externalData={{
            masterManagerId,
            selectData: metaData,
          }}
          afterOK={this.afterUpdateRoleModalOk}
        />
      </>
    );
  };
}

export default Detail;
