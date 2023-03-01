import { Divider, Space, Tabs } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { isArray, isBoolean, isObject } from 'easy-soft-utility';

import {
  builderPageHeaderExtraContent,
  decorateAvatar,
  iconBuilder,
  PageExtra,
} from 'antd-management-fast-component';

import { DataLoad } from '../DataSingleView/DataLoad';

import styles from './index.less';

const { HeaderTitle, HeaderContent, HeaderTagWrapper } = PageExtra;

class DataTabContainer extends DataLoad {
  resetDataAfterLoad = false;

  currentKey = '';

  tabList = [];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      defaultAvatarIcon: iconBuilder.picture(),
      showPageHeaderAvatar: true,
      customTabActiveKey: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParametersPrevious } = preState;

    if (
      (urlParams || null) == null ||
      (urlParametersPrevious || null) == null
    ) {
      return;
    }

    const { op } = urlParams;

    const { op: previousOp } = urlParametersPrevious;

    const { dataLoading } = this.state;

    if (
      !dataLoading &&
      ((previousOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProperties, preState, snapshot))
    ) {
      this.reloadData();

      const {
        location: { pathname },
      } = this.props;

      this.redirectToPath(`${pathname.replace('/update/', '/load/')}`);
    }
  };

  handleTabChange = (key) => {
    this.currentKey = key;
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabActiveKey = () => {
    return this.currentKey;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    return null;
  };

  getTabListAvailable = () => {
    const tabListAvailable = [];

    for (const o of this.tabList || []) {
      const v = o.show === undefined ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    }

    return this.adjustTabListAvailable(tabListAvailable);
  };

  buildOtherTabProps = () => {
    const tabListAvailable = this.getTabListAvailable();

    if (tabListAvailable.length > 0) {
      return {
        // destroyInactiveTabPane: true,
        type: 'card',
        size: 'small',
        tabBarStyle: {
          marginBottom: 0,
          backgroundColor: '#fff',
          paddingTop: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
        tabBarGutter: 3,
        animated: {
          inkBar: true,
          tabPane: true,
        },
        // activeKey: this.getTabActiveKey(),
        tabBarExtraContent: this.buildTabBarExtraContent(),
        items: tabListAvailable.map((o) => {
          return {
            style: {
              padding: '24px',
            },
            ...o,
          };
        }),
        onChange: this.handleTabChange(),
      };
    }

    return null;
  };

  establishTabBarExtraContentLeftConfig = () => {
    return null;
  };

  establishTabBarExtraContentRightConfig = () => {
    return null;
  };

  buildTabBarExtraContentItems = ({
    keyPrefix = '',
    list: configListSource,
    split: splitSource = false,
  }) => {
    const { split, list } = {
      split: splitSource || false,
      list: configListSource || [],
    };

    const configList = isArray(list) ? list : isObject(list) ? [list] : [];

    if (configList.length <= 0) {
      return null;
    }

    const listItem = this.buildByExtraBuildType({
      keyPrefix: keyPrefix || 'tabBarExtraContentItem',
      configList,
    });

    return (
      <Space
        split={
          isBoolean(split) ? split ? <Divider type="vertical" /> : null : split
        }
      >
        {listItem}
      </Space>
    );
  };

  buildTabBarExtraContent = () => {
    const leftItems = this.buildTabBarExtraContentItems({
      keyPrefix: `data_tab_container_tab_bar_left_action_key`,
      list: this.establishTabBarExtraContentLeftConfig(),
    });

    const rightItems = this.buildTabBarExtraContentItems({
      keyPrefix: `data_tab_container_tab_bar_right_action_key`,
      list: this.establishTabBarExtraContentRightConfig(),
    });

    return {
      left: leftItems,
      right: rightItems,
    };
  };

  renderFurther() {
    const {
      defaultAvatarIcon,
      showPageHeaderAvatar,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;

    const avatarProperties = showPageHeaderAvatar
      ? decorateAvatar(
          this.establishPageHeaderAvatarConfig(),
          defaultAvatarIcon,
          showPageHeaderAvatar,
          dataLoading,
          reloading,
          avatarImageLoadResult,
          () => {
            this.onPageHeaderAvatarLoadErrorCallback();
          },
        )
      : null;

    const pageHeaderContentConfig = this.establishPageHeaderContentConfig();

    return (
      <div
        style={{
          background: '#f0f2f5',
        }}
      >
        <PageContainer
          className={styles.customContainor}
          header={{
            ghost: false,
            style: {
              backgroundColor: '#fff',
              paddingBottom: '0',
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          }}
          childrenContentStyle={{
            padding: '0px',
          }}
          avatar={avatarProperties}
          title={
            <HeaderTitle
              title={this.getPresetPageName()}
              titlePrefix={this.establishPageHeaderTitlePrefix()}
            />
          }
          subTitle={this.buildPageHeaderSubTitle()}
          tags={
            <HeaderTagWrapper
              list={this.establishPageHeaderTagCollectionConfig()}
            />
          }
          extra={this.buildExtraAction()}
          content={<HeaderContent {...pageHeaderContentConfig} />}
          extraContent={builderPageHeaderExtraContent(
            this.establishPageHeaderExtraContentConfig(),
          )}
          // onBack={() => {
          //   this.backToList();
          // }}
        >
          <Tabs {...this.buildOtherTabProps()} />

          {this.renderPresetOther()}
        </PageContainer>
      </div>
    );
  }
}

export { DataTabContainer };
