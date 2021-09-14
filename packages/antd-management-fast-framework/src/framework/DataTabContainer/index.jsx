import React from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { pageHeaderRenderType } from '../../utils/constants';
import {
  pageHeaderTitle,
  pageHeaderTagWrapper,
  pageHeaderContent,
  pageHeaderExtraContent,
  buildTagList,
} from '../../customComponents/FunctionComponent';
import {
  avatarImageLoadResultCollection,
  decorateAvatar,
} from '../../customComponents/DecorateAvatar';

import DataSingleView from '../DataSingleView/DataLoad';

import styles from './index.less';

class DataTabContainer extends DataSingleView {
  needSetFormValueAfterLoad = false;

  tabList = [];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      defaultAvatarIcon: <PictureOutlined />,
      avatarImageLoadResult: avatarImageLoadResultCollection.wait,
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

  fillFormInitialValuesAfterLoad = ({
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

  onPageHeaderAvatarLoadErrorCallback = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  pageHeaderTagList = () => [];

  pageHeaderTag = () => {
    return buildTagList({ list: this.pageHeaderTagList() });
  };

  pageHeaderAvatar = () => {
    return null;
  };

  pageHeaderTitlePrefix = () => {
    return '';
  };

  pageHeaderSubTitle = () => null;

  pageHeaderContentGridData = () => {
    return [];
  };

  pageHeaderContentGridConfig = () => {
    return {
      type: pageHeaderRenderType.descriptionGrid,
      list: this.pageHeaderContentGridData(),
    };
  };

  pageHeaderContentParagraphData = () => {
    return [];
  };

  pageHeaderContentParagraphConfig = () => {
    return {
      type: pageHeaderRenderType.paragraph,
      list: this.pageHeaderContentParagraphData(),
    };
  };

  pageHeaderContentActionData = () => {
    return [];
  };

  pageHeaderContentActionConfig = () => {
    return {
      type: pageHeaderRenderType.action,
      list: this.pageHeaderContentActionData(),
    };
  };

  pageHeaderContentData = () => {
    return {
      list: [
        this.pageHeaderContentGridConfig(),
        this.pageHeaderContentParagraphConfig(),
        this.pageHeaderContentActionConfig(),
      ],
    };
  };

  pageHeaderExtraContentData = () => null;

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

  getPageName = () => {
    const { pageName } = this.state;

    return pageName;
  };

  render() {
    const {
      pageName,
      defaultAvatarIcon,
      showPageHeaderAvatar,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;
    const { children } = this.props;
    const { customTabActiveKey } = this.state;

    const tabListAvailable = this.getTabListAvailable();

    const avatarProps = showPageHeaderAvatar
      ? decorateAvatar(
          this.pageHeaderAvatar(),
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

    const pageHeaderContentDataConfig = this.pageHeaderContentData();

    if (customTabActiveKey) {
      return (
        <PageHeaderWrapper
          className={styles.customContainor}
          avatar={avatarProps}
          title={pageHeaderTitle(
            this.getPageName(),
            this.pageHeaderTitlePrefix(),
          )}
          subTitle={this.pageHeaderSubTitle()}
          tags={pageHeaderTagWrapper(this.pageHeaderTag())}
          extra={this.pageHeaderAction()}
          // eslint-disable-next-line no-restricted-globals
          tabActiveKey={this.getTabActiveKey()}
          content={pageHeaderContent(pageHeaderContentDataConfig)}
          extraContent={pageHeaderExtraContent(this.pageHeaderExtraContent())}
          tabList={tabListAvailable}
          // tabBarExtraContent={<Button>Extra Action</Button>}
          onTabChange={this.handleTabChange}
          tabProps={this.buildOtherTabProps()}
          // onBack={() => {
          //   this.backToList();
          // }}
        >
          {children}
        </PageHeaderWrapper>
      );
    }

    return (
      <PageHeaderWrapper
        className={styles.customContainor}
        avatar={avatarProps}
        title={pageHeaderTitle(pageName, this.pageHeaderTitlePrefix())}
        subTitle={this.pageHeaderSubTitle()}
        tags={pageHeaderTagWrapper(this.pageHeaderTag())}
        extra={this.pageHeaderAction()}
        // eslint-disable-next-line no-restricted-globals
        tabActiveKey={this.getTabActiveKey()}
        content={pageHeaderContent(pageHeaderContentDataConfig)}
        extraContent={pageHeaderExtraContent(this.pageHeaderExtraContentData())}
        tabList={tabListAvailable}
        // tabBarExtraContent={<Button>Extra Action</Button>}
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
