import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  dropdownExpandItemType,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getChannelName,
  getCustomerStatusName,
} from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
  togglePhoneVerifyAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ customer, schedulingControl }) => ({
  customer,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: modelTypeCollection.customerTypeCollection.get,
      backPath: `/frontEndUser/customer/pageList/key`,
      customerId: null,
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
    const { customerId } = this.state;

    d[fieldData.customerId.name] = customerId;

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
        key: fieldData.friendlyName.name,
      }),
    });
  };

  togglePhoneVerify = (o) => {
    togglePhoneVerifyAction({
      target: this,
      handleData: o,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherPhoneVerify.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherPhoneVerify.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
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
      successCallback: ({ target, remoteData }) => {
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

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.snippets() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '顾客名';
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
          text: '设为启用',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.customer.setEnable.permission,
          ),
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '即将设为上线，确定启用吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '设为禁用',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.customer.setDisable.permission,
          ),
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '即将设为下线，确定启用吗？',
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

    const whetherPhoneVerify = getValueByKey({
      data: metaData,
      key: fieldData.whetherPhoneVerify.name,
      convert: convertCollection.number,
    });

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'togglePhoneVerify': {
            that.togglePhoneVerify(handleData);
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
          key: 'togglePhoneVerify',
          text: whetherPhoneVerify ? '取消认证' : '设为认证',
          icon: whetherPhoneVerify
            ? iconBuilder.closeCircle(
                {
                  twoToneColor: colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.checkCircle(
                {
                  twoToneColor: colorCollection.yesColor,
                },
                iconModeCollection.twoTone,
              ),
          confirm: true,
          title: `即将${whetherPhoneVerify ? '取消认证' : '设为认证'}，确定吗？`,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getCustomerStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
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
        label: fieldData.customerId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.customerId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.realName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.realName.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.nickname.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.nickname.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.phone.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.phone.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.whetherPhoneVerifyNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherPhoneVerifyNote.name,
        }),
      },
      {
        label: fieldData.email.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.email.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.channel.label,
        value: getChannelName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.channel.name,
            convert: convertCollection.string,
          }),
        }),
      },
    ];
  };
}

export default Edit;
