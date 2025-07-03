import { connect } from 'easy-soft-dva';
import { getValueByKey, isFunction } from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemInnerWithDropdownButton,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '730280e05112435abb8146ede7f540ad';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class PageListSubsidiarySelectActionDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.subsidiary.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '请选择企业操作',
      loadApiPath: modelTypeCollection.subsidiaryTypeCollection.pageList,
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  onSelect = (selectData) => {
    PageListSubsidiarySelectActionDrawer.close();

    const { afterSelect } = this.props;

    if (isFunction(afterSelect)) {
      afterSelect(selectData);
    }
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishListViewSize = () => {
    return 'small';
  };

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
    return buildListViewItemInnerWithDropdownButton({
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
      extra: {
        size: 'small',
        text: '选取',
        placement: 'topRight',
        icon: iconBuilder.select(),
        handleButtonClick: ({ handleData }) => {
          this.onSelect(handleData);
        },
        handleData: item,
      },
      statusBarWrapperStyle: {
        paddingRight: '10px',
      },
    });
  };
}

export { PageListSubsidiarySelectActionDrawer };
