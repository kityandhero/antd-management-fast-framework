import { connect } from 'easy-soft-dva';
import { getValueByKey, isFunction } from 'easy-soft-utility';

import { listViewConfig, searchCardConfig } from 'antd-management-fast-common';
import {
  buildListViewItemInnerWithDropdownButton,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'cf24e8f5c883418fbfac13a44cdbc500';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class PageListSelectActionDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.user.pageList.permission;

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
      pageTitle: '请选择用户操作',
      loadApiPath: 'user/pageList',
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  onSelect = (selectData) => {
    PageListSelectActionDrawer.close();

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
          fieldData: fieldData.realName,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.phone,
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
      title: {
        label: fieldData.loginName.label,
        text: getValueByKey({
          data: item,
          key: fieldData.loginName.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.realName.label,
          text: getValueByKey({
            data: item,
            key: fieldData.realName.name,
          }),
          color: '#999999',
        },
        {
          label: fieldData.phone.label,
          text: getValueByKey({
            data: item,
            key: fieldData.phone.name,
          }),
          color: '#999999',
        },
      ],
      actionList: [
        {
          label: fieldData.userId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.userId.name,
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

export { PageListSelectActionDrawer };
