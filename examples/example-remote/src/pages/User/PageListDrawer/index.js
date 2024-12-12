import { Avatar, Divider, List, Space, Typography } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { listViewConfig, searchCardConfig } from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData } from '../Common/data';

const { Text } = Typography;
const { MultiPageSelectDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '8707bda2-983b-4f7f-985f-2e4403cc3406';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class PageListDrawer extends MultiPageSelectDrawer {
  reloadWhenShow = false;

  componentAuthority = accessWayCollection.user.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'user/pageList',
      listViewMode: listViewConfig.viewMode.list,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  getPageName = () => {
    return '请选择用户';
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
    const avatar = getValueByKey({
      data: item,
      key: fieldData.avatar.name,
    });

    const userId = getValueByKey({
      data: item,
      key: fieldData.userId.name,
    });

    const loginName = getValueByKey({
      data: item,
      key: fieldData.loginName.name,
    });

    const realName = getValueByKey({
      data: item,
      key: fieldData.realName.name,
    });

    const phone = getValueByKey({
      data: item,
      key: fieldData.phone.name,
    });

    const createTime = getValueByKey({
      data: item,
      key: fieldData.createTime.name,
      format: formatCollection.datetime,
    });

    return (
      <>
        <List.Item.Meta
          avatar={
            checkStringIsNullOrWhiteSpace(avatar) ? (
              <Avatar icon={iconBuilder.user()} />
            ) : (
              <Avatar src={avatar} />
            )
          }
          title={
            <Space>
              <ColorText
                textPrefix={fieldData.loginName.label}
                separator=": "
                text={loginName}
              />
              {/* <ColorText
                textPrefix={fieldData.realName.label}
                separator=": "
                text={realName}
              /> */}
              【{realName}】
            </Space>
          }
          description={
            <Space split={<Divider type="vertical" />}>
              <ColorText
                textPrefix={fieldData.phone.label}
                separator=": "
                text={phone || '暂无信息'}
                color={checkStringIsNullOrWhiteSpace(phone) ? '#bbb' : ''}
              />

              <ColorText
                textPrefix={fieldData.userId.label}
                separator=": "
                text={<Text copyable>{userId}</Text>}
              />

              <ColorText
                textPrefix={fieldData.createTime.label}
                separator=": "
                text={createTime}
              />
            </Space>
          }
        />

        {/* <div>性别：{getSexName(sex)}</div> */}
      </>
    );
  };
}

export { PageListDrawer };
