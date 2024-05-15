import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getUserYonYouCorrelationStatusName,
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

@connect(({ userYonYouCorrelation, schedulingControl }) => ({
  userYonYouCorrelation,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.userYonYouCorrelation.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.userYonYouCorrelation.get.permission,
      ),
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.userYonYouCorrelation.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'userYonYouCorrelation/get',
      backPath: `/data/userYonYouCorrelation/pageList/key`,
      userYonYouCorrelationId: null,
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
    const { userYonYouCorrelationId } = this.state;

    d.userYonYouCorrelationId = userYonYouCorrelationId;

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
        key: fieldData.personnelCode.name,
      }),
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        break;
      }
    }
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

  establishPageHeaderTitlePrefix = () => {
    return '用友账户关系';
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
          text: '启用账户关系',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '即将启用用友账户关系，确定吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '禁用账户关系',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '即将禁用用友账户关系，确定吗？',
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
            accessWayCollection.userYonYouCorrelation.refreshCache.permission,
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
      text: getUserYonYouCorrelationStatusName({
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
        label: fieldData.userYonYouCorrelationId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.userYonYouCorrelationId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.personnelCode.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.personnelCode.name,
        }),
      },
      {
        label: fieldData.realName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.realName.name,
        }),
      },
      {
        label: fieldData.organization.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.organization.name,
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
        label: fieldData.gender.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.gender.name,
        }),
      },
      {
        label: fieldData.userRealName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.userRealName.name,
          defaultValue: '暂无',
        }),
      },
    ];
  };
}

export default Detail;
