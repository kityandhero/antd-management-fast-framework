import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  tryPurgeAction,
  trySendAction,
  tryStartAllAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { DequeueDrawer } from '../DequeueDrawer';
import { PeekDrawer } from '../PeekDrawer';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ queueInfo, schedulingControl }) => ({
  queueInfo,
  schedulingControl,
}))
class Index extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '异常列表',
      paramsKey: accessWayCollection.queueInfo.pageList.paramsKey,
      loadApiPath: 'queueInfo/pageList',
      currentRecord: null,
      canReStart: whetherNumber.no,
    };
  }

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const { other } = {
      other: {
        canReStart: whetherNumber.no,
      },
      ...metaExtra,
    };

    this.setState({
      canReStart: getValueByKey({
        data: other,
        key: 'canReStart',
        convert: convertCollection.number,
      }),
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'trySend': {
        this.trySend(handleData);
        break;
      }

      case 'tryPeek': {
        this.showPeekDrawer(handleData);
        break;
      }

      case 'tryDequeue': {
        this.showDequeueDrawer(handleData);
        break;
      }

      case 'tryPurge': {
        this.tryPurge(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  trySend = (r) => {
    trySendAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  tryPurge = (r) => {
    tryPurgeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  tryStartAll = () => {
    tryStartAllAction({
      target: this,
      handleData: {},
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

  showPeekDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PeekDrawer.open();
    });
  };

  showDequeueDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      DequeueDrawer.open();
    });
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
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
    const { canReStart } = this.state;

    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalExtraButton,
        type: 'dashed',
        icon: iconBuilder.playCircle(),
        text: '尝试重新启动',
        hidden: canReStart !== whetherNumber.yes,
        handleClick: this.tryStartAll,
        confirm: true,
        title: '尝试重新启动队列消费端，确定吗？',
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.edit(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'trySend',
          icon: iconBuilder.message(),
          text: '测试发送',
          confirm: true,
          title: '即将测试消息发送，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'tryPeek',
          icon: iconBuilder.read(),
          text: '测试读取',
        },
        {
          key: 'tryDequeue',
          icon: iconBuilder.read(),
          text: '尝试消费',
          confirm: true,
          title:
            '即将尝试消费队列数据,该操作会导致队列被移出，请谨慎操作，确定继续吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'startQueue',
          icon: iconBuilder.playCircle(),
          text: '尝试启动消费端',
          confirm: true,
          title: '即将尝试启动消费端，确定继续吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'tryPurge',
          icon: iconBuilder.clear(),
          text: '尝试清空队列',
          confirm: true,
          title: '即将尝试清空队列，请谨慎操作，确定继续吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.queueModeNote,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.count,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.queueInfoId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PreviewDrawer maskClosable externalData={currentRecord} />

        <PeekDrawer maskClosable externalData={currentRecord} />

        <DequeueDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default Index;
