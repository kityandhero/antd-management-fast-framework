import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getUserYonYouCorrelationStatusName } from '../../../customSpecialComponents';
import { UserSelectDrawerField } from '../../User/SelectDrawerField';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ userYonYouCorrelation, schedulingControl }) => ({
  userYonYouCorrelation,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.userYonYouCorrelation.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用友账户关系列表',
      paramsKey: accessWayCollection.userYonYouCorrelation.pageList.paramsKey,
      loadApiPath: 'userYonYouCorrelation/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const userYonYouCorrelationId = getValueByKey({
      data: handleData,
      key: fieldData.userYonYouCorrelationId.name,
    });

    handleItem({
      target,
      value: userYonYouCorrelationId,
      compareValueHandler: (o) => {
        const { userYonYouCorrelationId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
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
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = ({
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
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToEdit = (item) => {
    const userYonYouCorrelationId = getValueByKey({
      data: item,
      key: fieldData.userYonYouCorrelationId.name,
    });

    this.goToPath(
      `/person/userYonYouCorrelation/edit/load/${userYonYouCorrelationId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: (
            <UserSelectDrawerField
              label={fieldData.userId.label}
              defaultValue={''}
              helper={fieldData.userId.helper}
              afterSelectSuccess={(d) => {
                this.afterUserSelect(d);
              }}
              afterClearSelect={() => {
                this.afterUserClearSelect();
              }}
            />
          ),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.realName,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.organization,
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '创建用友账户关系',
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.userYonYouCorrelation.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'toggleRecommend',
          icon: iconBuilder.swap(),
          text: '切换推荐',
          confirm: true,
          title: '将要切换推荐设置，确定吗？',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          disabled: status === statusCollection.enable,
          confirm: true,
          title: '将要设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          disabled: status === statusCollection.disable,
          confirm: true,
          title: '将要设为禁用，确定吗？',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除用友账户关系',
          confirm: true,
          title: '将要移除用友账户关系，确定吗？',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.personnelCode,
      width: 120,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.realName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.organization,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.gender,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userRealName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getUserYonYouCorrelationStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.userId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userYonYouCorrelationId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    return (
      <>
        <AddBasicInfoDrawer afterOK={this.afterAddBasicInfoDrawerOk} />
      </>
    );
  };
}

export default PageList;
