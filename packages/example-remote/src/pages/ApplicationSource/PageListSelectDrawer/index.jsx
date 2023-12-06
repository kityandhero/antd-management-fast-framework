import { connect } from 'easy-soft-dva';
import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  getApplicationSourceCreateModeName,
  getApplicationSourceStatusName,
  getApplicationSourceTypeName,
  renderSearchApplicationSourceCreateModeSelect,
  renderSearchApplicationSourceStatusSelect,
  renderSearchApplicationSourceTypeSelect,
} from '../../../customSpecialComponents';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

const visibleFlag = 'dad592ffa0ee4d16a0fa34503fd745bb';

@connect(({ applicationSource, schedulingControl }) => ({
  applicationSource,
  schedulingControl,
}))
class PageListSelectDrawer extends MultiPageSelectDrawer {
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

  getPageName = () => {
    return '应用源';
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.createMode.name] = unlimitedWithStringFlag.key;
    values[fieldData.type.name] = unlimitedWithStringFlag.key;
    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchApplicationSourceCreateModeSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchApplicationSourceTypeSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchApplicationSourceStatusSelect({}),
        },
        {
          lg: 6,
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
  ];
}

export { PageListSelectDrawer };
