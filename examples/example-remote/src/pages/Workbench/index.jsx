import { connect } from 'easy-soft-dva';
import {
  getCurrentOperatorCache,
  getValueByKey,
  toNumber,
} from 'easy-soft-utility';

import {
  buildRandomHexColor,
  columnFacadeMode,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  getCurrentOperator,
} from 'antd-management-fast-framework';

import { getWebChannelName } from '../../customSpecialComponents';
import { removeAction } from '../ErrorLog/Assist/action';
import { getResolveBadge } from '../ErrorLog/Assist/tools';
import { fieldData } from '../ErrorLog/Common/data';
import { PreviewDrawer } from '../ErrorLog/PreviewDrawer';

import { PageHeaderContent } from './PageHeaderContent';
import ShortcutPanel from './ShortcutPanel';

const { MultiPage } = DataMultiPageView;

@connect(({ errorLog, currentOperator, schedulingControl }) => ({
  errorLog,
  currentOperator,
  schedulingControl,
}))
class Index extends MultiPage {
  resetDataAfterLoad = false;

  showSearchForm = false;

  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 8,
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '工作台',
      listTitle: '新近异常列表',
      loadApiPath: 'errorLog/pageList',
      tableScrollX: 1020,
      currentOperator: null,
    };
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    getCurrentOperator({
      successCallback: (data) => {
        that.setState({ currentOperator: data });
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'goToEdit': {
        this.goToEdit(handleData);
        break;
      }

      case 'delete': {
        this.delete(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  delete = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  goToEdit = (record) => {
    const errorLogId = getValueByKey({
      data: record,
      key: fieldData.errorLogId.name,
    });

    this.goToPath(`/logs/errorLog/edit/load/${errorLogId}/key/basicInfo`);
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishPageHeaderSubTitle = () => {
    return '在这里可以快速开展任务作业';
  };

  establishPageContentLayoutSiderConfig = () => {
    return {
      position: 'right',
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'goToEdit',
          icon: iconBuilder.read(),
          text: '日志详情',
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'delete',
          icon: iconBuilder.delete(),
          text: '删除日志',
          confirm: true,
          title: '即将删除日志，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.message,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 150,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.resolve,
      width: 100,
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value, record) => {
        return {
          status: getResolveBadge(value),
          text: record.resolveNote || '--',
        };
      },
    },
    {
      dataTarget: fieldData.channel,
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
        return getWebChannelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.errorLogId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
  ];

  establishPageHeaderContentComponentConfig = () => {
    const currentOperator = getCurrentOperatorCache();

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    const name = getValueByKey({
      data: currentOperator,
      key: 'name',
      defaultValue: '--',
    });

    return {
      component: <PageHeaderContent avatar={avatar} name={name} />,
    };
  };

  establishSiderTopAreaConfig = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <ShortcutPanel />

        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default Index;
