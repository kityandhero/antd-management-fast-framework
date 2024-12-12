import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { buildListViewItemInner } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'eb780ef188444a1aa17e11a28dd63e38';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class PageListSelectDrawer extends MultiPageSelectDrawer {
  reloadWhenShow = false;

  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'subsidiary/pageList',
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  getPageName = () => {
    return '请选择上级公司';
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.subsidiaryId,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.shortName,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    return buildListViewItemInner({
      image: getValueByKey({
        data: item,
        key: fieldData.logo.name,
        defaultValue: defaultEmptyImage,
      }),
      title: {
        label: fieldData.shortName.label,
        text: getValueByKey({
          data: item,
          key: fieldData.shortName.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.fullName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.fullName.name,
          }),
          color: '#999999',
        },
      ],
      actionList: [
        {
          label: fieldData.subsidiaryId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.subsidiaryId.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.code.label,
          text: getValueByKey({
            data: item,
            key: fieldData.code.name,
            defaultValue: '暂无',
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldData.createTime.name,
          }),
          color: '#999999',
        },
      ],
    });
  };
}

export { PageListSelectDrawer };
