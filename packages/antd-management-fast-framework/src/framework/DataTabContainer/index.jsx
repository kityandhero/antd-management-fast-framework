import { Divider, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  isArray,
  isBoolean,
  isObject,
} from 'antd-management-fast-common/es/utils/tools';
import { decorateAvatar } from 'antd-management-fast-component/es/customComponents/DecorateAvatar';
import {
  buildPageHeaderContent,
  buildPageHeaderTagWrapper,
  buildPageHeaderTitle,
  pageHeaderExtraContent,
} from 'antd-management-fast-component/es/customComponents/FunctionComponent';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';

import DataSingleView from '../DataSingleView/DataLoad';

import styles from './index.less';

class DataTabContainer extends DataSingleView {
  resetDataAfterLoad = false;

  tabList = [];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      defaultAvatarIcon: iconBuilder.picture(),
      showPageHeaderAvatar: true,
      customTabActiveKey: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParamsPrev } = preState;

    if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
      return;
    }

    const { op } = urlParams;

    const { op: prevOp } = urlParamsPrev;

    const { dataLoading } = this.state;

    if (!dataLoading) {
      if (
        (prevOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProps, preState, snapshot)
      ) {
        this.reloadData();

        const {
          location: { pathname },
        } = this.props;

        this.redirectToPath(`${pathname.replace('/update/', '/load/')}`);
      }
    }
  };

  handleTabChange = (key) => {
    const { match } = this.props;

    (this.tabList || []).forEach((item) => {
      if (item.key === key) {
        this.redirectToPath(
          `${match.url.replace('/update', '/load')}/${item.key}`,
        );
      }
    });
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabActiveKey = () => {
    const {
      match,
      location: { pathname },
    } = this.props;

    return pathname
      .replace(/\//g, '-')
      .replace(`${match.url.replace(/\//g, '-')}-`, '')
      .replace(/-/g, '/');
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    return null;
  };

  getTabListAvailable = () => {
    const tabListAvailable = [];

    (this.tabList || []).forEach((o) => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

    return this.adjustTabListAvailable(tabListAvailable);
  };

  buildOtherTabProps = () => {
    const tabListAvailable = this.getTabListAvailable();

    if (tabListAvailable.length > 0) {
      return {
        type: 'card',
        size: 'small',
        tabBarStyle: {
          marginBottom: 0,
        },
        tabBarGutter: 3,
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
      ...{
        split: false,
        list: [],
      },
      ...{
        split: splitSource,
        list: configListSource,
      },
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
    const { children } = this.props;

    const tabListAvailable = this.getTabListAvailable();

    const avatarProps = showPageHeaderAvatar
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
      <PageHeaderWrapper
        className={styles.customContainor}
        avatar={avatarProps}
        title={buildPageHeaderTitle(
          this.getPageName(),
          this.establishPageHeaderTitlePrefix(),
        )}
        subTitle={this.buildPageHeaderSubTitle()}
        tags={buildPageHeaderTagWrapper(this.establishPageHeaderTagConfig())}
        extra={this.buildExtraAction()}
        tabActiveKey={this.getTabActiveKey()}
        content={buildPageHeaderContent(pageHeaderContentConfig)}
        extraContent={pageHeaderExtraContent(
          this.establishPageHeaderExtraContentConfig(),
        )}
        tabList={tabListAvailable}
        tabBarExtraContent={this.buildTabBarExtraContent()}
        onTabChange={this.handleTabChange}
        tabProps={this.buildOtherTabProps()}
        // onBack={() => {
        //   this.backToList();
        // }}
      >
        {children}

        {this.renderOther()}
      </PageHeaderWrapper>
    );
  }
}

export default DataTabContainer;
