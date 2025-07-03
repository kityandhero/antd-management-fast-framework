import { Tooltip } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  extraBuildType,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowCaseStatusCollection,
} from '../../../customConfig';
import {
  getChannelName,
  getFlowCaseStatusName,
  renderSearchBusinessModeSelect,
  renderSearchFlowScopeSelect,
  renderSearchFlowStatusSelect,
} from '../../../customSpecialComponents';
import { getFlowCaseStatusBadge } from '../../../pageBases';
import {
  forceEndAction,
  hideAction,
  refreshCacheAction,
  repairSubsidiaryAction,
  toggleEmergencyAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.workflowCase.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1720,
      pageTitle: '流程实例列表',
      paramsKey: accessWayCollection.workflowCase.pageList.paramsKey,
      loadApiPath: 'workflowCase/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const id = getValueByKey({
      data: handleData,
      key: fieldData.workflowCaseId.name,
    });

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        const { workflowId: v } = o;

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
      case 'forceEnd': {
        this.forceEnd(handleData);

        break;
      }

      case 'toggleEmergency': {
        this.toggleEmergency(handleData);

        break;
      }

      case 'hide': {
        this.hide(handleData);

        break;
      }

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

  forceEnd = (r) => {
    forceEndAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  toggleEmergency = (r) => {
    toggleEmergencyAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  hide = (r) => {
    hideAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  repairSubsidiary = (r) => {
    repairSubsidiaryAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadDataWithReloadAnimalPrompt({});
      },
    });
  };

  goToEdit = (item) => {
    const workflowCaseId = getValueByKey({
      data: item,
      key: fieldData.workflowCaseId.name,
    });

    this.goToPath(
      `/flow/workflowCase/edit/load/${workflowCaseId}/key/basicInfo`,
    );
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.edit(),
          text: '修复归属企业数据',
          size: 'small',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.repairSubsidiary.permission,
          ),
          handleClick: () => {
            this.repairSubsidiary();
          },
          confirm: true,
          title:
            '即将修复流程中的归属企业数, 该操作应仅在需修复时候执行，操作较为耗时，确定吗？',
        },
      ],
    };
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.scope.name] = unlimitedWithStringFlag.flag;
    values[fieldData.businessMode.name] = unlimitedWithStringFlag.flag;
    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowScopeSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchBusinessModeSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.whetherEmergency,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
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
          key: 'forceEnd',
          icon: iconBuilder.stop(),
          text: '强制结束',
          disabled: !checkHasAuthority(
            accessWayCollection.workflowCase.forceEnd.permission,
          ),
          hidden: !checkInCollection(
            [
              flowCaseStatusCollection.submitApproval,
              flowCaseStatusCollection.inApprovalProcess,
            ],
            status,
          ),
          confirm: true,
          title: '将要强制结束审批（即该次审批作废），确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleEmergency',
          icon: iconBuilder.swap(),
          text: '切换紧急',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.toggleEmergency.permission,
          ),
          disabled: !checkInCollection(
            [flowCaseStatusCollection.created],
            status,
          ),
          confirm: true,
          title:
            '将要切换紧急状态（位于紧急状态下的审批，会向审批人发送审批通知），确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'hide',
          icon: iconBuilder.delete(),
          text: '移除审批',
          disabled: !checkHasAuthority(
            accessWayCollection.workflowCase.hide.permission,
          ),
          confirm: true,
          title: '将要移除目标审批，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
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
      dataTarget: { ...fieldData.workflowCaseId, label: '项目流水号' },
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      render: (value, record) => {
        const whetherEmergency = getValueByKey({
          data: record,
          key: fieldData.whetherEmergency.name,
          convert: convertCollection.number,
        });

        const valuePart =
          whetherEmergency === whetherNumber.yes ? (
            <ColorText
              textPrefix="[紧急]"
              textPrefixStyle={{
                color: 'red',
                paddingRight: '6px',
              }}
              separator=""
              text={value}
              multiLine
            />
          ) : (
            <ColorText text={value} multiLine />
          );

        return (
          <Tooltip placement="topLeft" title={value}>
            <div>{valuePart}</div>
          </Tooltip>
        );
      },
    },
    {
      dataTarget: fieldData.workflowName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userRealName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherEmergencyNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const whetherEmergency = getValueByKey({
          data: o,
          key: fieldData.whetherEmergency.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(whetherEmergency) * 25 + 47,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.channel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 47,
          }),
        };
      },
      formatValue: (value) => {
        return getChannelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseStatusBadge(value),
          text: getFlowCaseStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export default PageList;
