import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  replaceWithKeep,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { removeAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ internalTester, schedulingControl }) => ({
  internalTester,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.internalTester.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '内测用户列表',
      paramsKey: accessWayCollection.internalTester.pageList.paramsKey,
      loadApiPath: 'internalTester/pageList',
      dateRangeFieldName: '注册时间',
    };
  }

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  goToAdd = () => {
    this.goToPath(`/person/internalTester/add`);
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.addCircle(),
        text: '新增内测用户',
        handleClick: this.goToAdd,
        hidden: !checkHasAuthority(
          accessWayCollection.internalTester.addBasicInfo.permission,
        ),
      },
    ];
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.nickname,
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
    return {
      size: 'small',
      text: '移除',
      icon: iconBuilder.delete(),
      disabled: !checkHasAuthority(
        accessWayCollection.internalTester.remove.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.remove(handleData);
      },
      handleData: record,
      confirm: true,
      title: '即将移除数据，确定吗？',
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.nickname,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value, record) => {
        return checkStringIsNullOrWhiteSpace(value)
          ? replaceWithKeep(
              getValueByKey({
                data: record,
                key: fieldData.userId.name,
              }),
              '***',
              2,
              6,
            )
          : value;
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
      fixed: 'right',
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export default PageList;
