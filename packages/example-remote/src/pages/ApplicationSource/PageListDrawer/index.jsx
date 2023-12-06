import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  getValueByKey,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  getApplicationSourceCreateModeName,
  getApplicationSourceStatusName,
  getApplicationSourceTypeName,
  renderSearchApplicationSourceStatusSelect,
  renderSearchApplicationSourceTypeSelect,
} from '../../../customSpecialComponents';
import { setOwnAction } from '../../Application/Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

const visibleFlag = '3dae6c5d902c4869b8408a7dc58beeba';

@connect(({ applicationSource, application, schedulingControl }) => ({
  applicationSource,
  application,
  schedulingControl,
}))
class Index extends MultiPageDrawer {
  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 440,
      loadApiPath: 'applicationSource/pageList',
    };
  }

  // eslint-disable-next-line no-unused-vars
  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const createMode = getValueByKey({
      data: externalData,
      key: fieldData.createMode.label,
    });

    const own = getValueByKey({
      data: externalData,
      key: 'own',
    });

    return {
      ...o,

      own: own || 0,
      createMode: createMode || 0,
    };
  };

  getPageName = () => {
    return '应用源';
  };

  setOwn = (r) => {
    const { externalData } = this.props;

    const createMode = getValueByKey({
      data: externalData,
      key: fieldData.createMode.label,
    });

    setOwnAction({
      target: this,
      handleData: {
        ...r,
        createMode: createMode || 0,
      },
      successCallback: ({ target }) => {
        target.refreshData({});
      },
    });
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.type.name] = unlimitedWithStringFlag.key;
    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchApplicationSourceTypeSelect({}),
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchApplicationSourceStatusSelect({}),
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
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
      formatValue: (value) => {
        return value === 0 ? '' : value;
      },
    },
    {
      dataTarget: fieldData.type,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 10,
          }),
        };
      },
      formatValue: (value) => {
        return getApplicationSourceTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.createMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 30,
          }),
        };
      },
      formatValue: (value) => {
        return getApplicationSourceCreateModeName({
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
          status: getStatusBadge(value),
          text: getApplicationSourceStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.customOperate,
      width: 116,
      fixed: 'right',
      showRichFacade: true,
      facadeMode: columnFacadeMode.dropdown,
      configBuilder: (value, record) => {
        return {
          size: 'small',
          icon: iconBuilder.cloudDownload(),
          text: '立即开通',
          handleButtonClick: () => {
            this.setOwn(record);
          },
          confirm: true,
          title: '立即开通应用程序，确定吗？',
        };
      },
    },
  ];
}

export default Index;
