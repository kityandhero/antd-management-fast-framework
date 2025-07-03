import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { PageListOpenComplaintDrawer } from '../../Subsidiary/PageListOpenComplaintDrawer';
import { refreshCacheAction, removeAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ subsidiaryComplaintMessage, schedulingControl }) => ({
  subsidiaryComplaintMessage,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.subsidiaryComplaintMessage.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '企业投诉信息列表',
      paramsKey:
        accessWayCollection.subsidiaryComplaintMessage.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintMessageTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);
        break;
      }

      case 'showPreviewDrawer': {
        this.showPreviewDrawer(handleData);
        break;
      }

      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (o) => {
    refreshCacheAction({
      target: this,
      handleData: o,
    });
  };

  remove = (o) => {
    removeAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  showPageListOpenComplaintDrawer = () => {
    PageListOpenComplaintDrawer.open();
  };

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  showPreviewDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        PreviewDrawer.open();
      },
    );
  };

  goToEdit = (record) => {
    const subsidiaryComplaintMessageId = getValueByKey({
      data: record,
      key: fieldData.subsidiaryComplaintMessageId.name,
      defaultValue: '',
    });

    this.goToPath(
      `/subsidiaryMessages/subsidiaryComplaintMessage/edit/load/${subsidiaryComplaintMessageId}/key/basicInfo`,
    );
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
          listViewConfig.dataContainerExtraActionBuildType.generalExtraButton,
        type: 'default',
        icon: iconBuilder.unorderedList(),
        text: '已开启投诉功能的企业列表',
        handleClick: this.showPageListOpenComplaintDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    const that = this;

    return {
      size: 'small',
      text: '查阅',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.subsidiaryComplaintMessage.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        that.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        that.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'goToEdit',
          icon: iconBuilder.edit(),
          text: '查看详情',
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiaryComplaintMessage.get.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiaryComplaintMessage.pageListOperateLog
              .permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiaryComplaintMessage.refreshCache
              .permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除',
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiaryComplaintMessage.remove.permission,
          ),
          confirm: true,
          title: '即将此消息，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.customerPhone,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.customerFriendlyName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryComplaintCategoryName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherConfirmNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const whetherConfirm = getValueByKey({
          data: o,
          key: fieldData.whetherConfirm.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(whetherConfirm) * 25 + 47,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.whetherReplyNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const whetherReply = getValueByKey({
          data: o,
          key: fieldData.whetherReply.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(whetherReply) * 25 + 47,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.subsidiaryComplaintMessageId,
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:请及时操作核实功能， 未核实的信息事实参考性可能有所欠缺。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PageListOpenComplaintDrawer />

        <PreviewDrawer externalData={currentRecord} maskClosable />

        <OperateLogDrawer externalData={currentRecord} maskClosable />
      </>
    );
  };
}

export default PageList;
