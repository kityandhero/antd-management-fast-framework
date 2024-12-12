import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  getDerivedStateFromPropertiesForUrlParameters,
  tabBarCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getTagStatusName,
} from '../../../customSpecialComponents';
import { GraphicalSingleSubsidiaryDepartmentTreeDrawer } from '../../Organization/GraphicalSingleSubsidiaryDepartmentTreeDrawer';
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

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.subsidiary.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(accessWayCollection.subsidiary.get.permission),
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.subsidiary.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'subsidiary/get',
      backPath: `/organization/subsidiary/pageList/key`,
      subsidiaryId: null,
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
    const { subsidiaryId } = this.state;

    d.subsidiaryId = subsidiaryId;

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
        key: fieldData.shortName.name,
      }),
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
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

  openGraphicalSingleSubsidiaryDepartmentTreeDrawer = () => {
    GraphicalSingleSubsidiaryDepartmentTreeDrawer.open();
  };

  establishPageHeaderTitlePrefix = () => {
    return '公司';
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const logo = getValueByKey({
      data: metaData,
      key: fieldData.logo.name,
    });

    if (!checkStringIsNullOrWhiteSpace(logo || '')) {
      return { src: logo };
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
          text: '启用公司',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '即将启用公司，确定吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '禁用公司',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '即将禁用公司，确定吗？',
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
            accessWayCollection.subsidiary.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishTabBarExtraContentRightConfig = () => {
    return [
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '组织图例',
        size: 'small',
        handleClick: () => {
          this.openGraphicalSingleSubsidiaryDepartmentTreeDrawer();
        },
      },
    ];
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '当前状态',
      text: getTagStatusName({
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
        label: fieldData.subsidiaryId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.subsidiaryId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.shortName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.shortName.name,
        }),
      },
      {
        label: fieldData.fullName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.fullName.name,
        }),
      },
      {
        label: fieldData.sort.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.sort.name,
        }),
      },
      {
        label: fieldData.parentId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.parentId.name,
        }),
      },
      {
        label: fieldData.parentShortName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.parentShortName.name,
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <GraphicalSingleSubsidiaryDepartmentTreeDrawer
          maskClosable
          externalData={metaData}
        />
      </>
    );
  };
}

export default Detail;
