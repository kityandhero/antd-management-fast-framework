import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  closeSignetPasswordSwitchAction,
  openSignetPasswordSwitchAction,
  refreshCacheAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { ResetSignetPasswordModal } from '../ResetSignetPasswordModal';

const { MultiPage } = DataMultiPageView;
const {
  Whether: { getWhetherName },
} = FunctionSupplement;

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class PageListSignet extends MultiPage {
  componentAuthority = accessWayCollection.user.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '印章管理',
      paramsKey: accessWayCollection.user.pageList.paramsKey,
      loadApiPath: 'user/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemSignetPasswordSwitch = ({ target, handleData, remoteData }) => {
    const userId = getValueByKey({
      data: handleData,
      key: fieldData.userId.name,
    });

    handleItem({
      target,
      value: userId,
      compareValueHandler: (o) => {
        const { userId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.signetPasswordSwitch.name] = getValueByKey({
          data: remoteData,
          key: fieldData.signetPasswordSwitch.name,
        });

        o[fieldData.signetPasswordSwitchNote.name] = getValueByKey({
          data: remoteData,
          key: fieldData.signetPasswordSwitchNote.name,
        });

        return d;
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showResetSignetPasswordModal': {
        this.showResetSignetPasswordModal(handleData);
        break;
      }

      case 'openSignetPasswordSwitch': {
        this.openSignetPasswordSwitch(handleData);
        break;
      }

      case 'closeSignetPasswordSwitch': {
        this.closeSignetPasswordSwitch(handleData);
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

  openSignetPasswordSwitch = (r) => {
    openSignetPasswordSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemSignetPasswordSwitch({
          target,
          handleData,
          remoteData,
        });
      },
    });
  };

  closeSignetPasswordSwitch = (r) => {
    closeSignetPasswordSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemSignetPasswordSwitch({
          target,
          handleData,
          remoteData,
        });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showResetSignetPasswordModal = (record) => {
    this.setState({ currentRecord: record }, () => {
      ResetSignetPasswordModal.open();
    });
  };

  afterResetSignetPasswordModalOk = ({
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

  goToEdit = (record) => {
    const { userId } = record;

    this.goToPath(`/person/user/edit/load/${userId}/key/basicInfo`);
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.userId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.nickname,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.realName,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    const signetPasswordSwitch = getValueByKey({
      data: record,
      key: fieldData.signetPasswordSwitch.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.user.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showResetSignetPasswordModal',
          icon: iconBuilder.form(),
          text: '重置密码',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'openSignetPasswordSwitch',
          icon: iconBuilder.playCircle(),
          text: '开启密码',
          disabled: signetPasswordSwitch === whetherNumber.yes,
          confirm: true,
          title: '将要开启印章密码，确定吗？',
        },
        {
          key: 'closeSignetPasswordSwitch',
          icon: iconBuilder.pauseCircle(),
          text: '关闭密码',
          disabled: signetPasswordSwitch === whetherNumber.no,
          confirm: true,
          title: '将要关闭印章密码，确定吗？',
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
      dataTarget: fieldData.loginName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.realName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.signet,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.signetPasswordNeedSet,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) === whetherNumber.yes ? 10 : 20 + 31,
          }),
        };
      },
      formatValue: (value) => {
        return toNumber(value) === whetherNumber.yes ? '已设密码' : '无密码';
      },
    },
    {
      dataTarget: fieldData.signetPasswordSwitch,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 31,
          }),
        };
      },
      formatValue: (value) => {
        return getWhetherName({
          value: value,
          trueText: '开启',
          falseText: '关闭',
        });
      },
    },
    {
      dataTarget: fieldData.userId,
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
    const { currentRecord } = this.state;

    return (
      <>
        <ResetSignetPasswordModal externalData={currentRecord} />
      </>
    );
  };
}

export default PageListSignet;
