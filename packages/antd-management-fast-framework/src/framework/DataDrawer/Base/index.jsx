import { Col, Divider, Layout, Row, Space } from 'antd';
import React, { Fragment } from 'react';

import {
  isArray,
  isUndefined,
  logCallTrack,
  mergeArrowText,
  showSimpleErrorMessage,
  toString,
} from 'easy-soft-utility';

import {
  cardConfig,
  contentConfig,
  defaultFormState,
  drawerConfig,
  emptyLogic,
  renderFurtherColorWhenNoCallProcess,
  renderFurtherPrefixWhenNoCallProcess,
} from 'antd-management-fast-common';
import {
  buildButton,
  buildDropdown,
  buildDropdownButton,
  buildDropdownEllipsis,
  buildFlexSelect,
  FlexBox,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

import { DrawerExtra } from '../../../components/DrawerExtra';
import { BaseWindow } from '../../DataOperation/BaseWindow';

import styles from './index.less';

const { Footer, Content } = Layout;

const primaryCallName = 'DataDrawer::Base';

/**
 * Drawer 操作基类
 * @namespace DataDrawer
 * @class DataDrawer.Base
 * @extends BaseWindow
 */
class Base extends BaseWindow {
  /**
   * 内容包裹类型，赋值为 contentConfig.wrapperType.drawer，务必不要更改此项属性值。
   * @property
   */
  contentWrapperType = contentConfig.wrapperType.drawer;

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      title: '',
      width: 820,
      height: 256,
      visible: false,
      dataLoading: false,
      showBottomBar: false,
      submitApiPath: '',
      placement: 'right',
      overlayButtonOpenText: '打开浮层',
      overlayButtonCloseText: '关闭浮层',
    };
  }

  /**
   * 调整头部样式。
   * @function
   * @returns {Object} style
   * @example
   * adjustHeaderStyle = () => { return {}; }
   */
  adjustHeaderStyle = () => {
    this.logCallTrack({}, primaryCallName, 'adjustHeaderStyle', emptyLogic);

    return {};
  };

  /**
   * 创建标题前缀文字，默认为空，可根据需要重载。
   * @function
   * @returns {string} 标题前缀文本
   * @example
   * buildTitlePrevText = () => ""
   */
  buildTitlePrevText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitlePrevText', emptyLogic);

    return '';
  };

  /**
   * 创建标题文字。
   * @function
   * @returns {string} 标题文本
   */
  buildTitleText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleText');

    this.logCallTrace(
      {},
      primaryCallName,
      'buildTitleText',
      'getPresetPageTitle',
    );

    return this.getPresetPageTitle();
  };

  /**
   * 创建副标题文字，默认为空，可根据需要重载。
   * @function
   * @returns {string} 副标题文本
   * @example
   * buildTitleSubText = () => ""
   */
  buildTitleSubText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleSubText', emptyLogic);

    return '';
  };

  /**
   * 渲染标题图标，默认为空，可根据需要重载。
   * @function
   * @returns {Object} 标题图标
   * @example
   * renderPresetTitleIcon = () => null
   */
  renderPresetTitleIcon = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetTitleIcon', emptyLogic);

    return null;
  };

  /**
   * 配置通知出现位置配置，默认为 bottomLeft，可根据需要重载。
   * @function
   * @returns {string} 位置配置
   * @example
   * buildNotificationPlacement = () => 'bottomLeft'
   */
  buildNotificationPlacement = () => {
    this.logCallTrack({}, primaryCallName, 'buildNotificationPlacement');

    return `bottomLeft`;
  };

  /**
   * 渲染内容容器内部。
   * @function
   * @returns {Object} 渲染结果
   * @example
   * renderPresetContentContainorInner = () => null
   */
  renderPresetContentContainorInner = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'renderPresetContentContainorInner',
      emptyLogic,
    );

    const text = 'renderPresetContentContainorInner need be override';

    showSimpleErrorMessage(text);

    return null;
  };

  /**
   * 渲染内容容器。
   * @function
   * @returns {Object} 渲染结果
   */
  renderPresetContentContainor = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentContainor');

    return (
      <div className={styles.contentContainor}>
        {this.renderPresetContentContainorInner()}
      </div>
    );
  };

  /**
   * 渲染关闭按钮。
   * @function
   * @param {Object} option 配置项
   * @returns {Object} 渲染结果
   */
  renderPresetCloseButton = (option) => {
    this.logCallTrack(
      {
        parameter: { option },
      },
      primaryCallName,
      'renderPresetCloseButton',
    );

    const o = {
      type: 'default',
      icon: iconBuilder.closeCircle(),
      text: '关闭',
      ...option,

      handleClick: () => {
        this.onClose();
      },
    };

    return buildButton(o);
  };

  /**
   * 构造底部栏内部Extra区域配置集合。
   * @function
   * @returns {Array} 配置集合
   * @example
   * buildBottomBarInnerExtraConfigList = () => []
   */
  buildBottomBarInnerExtraConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerExtraConfigList',
      emptyLogic,
    );

    return [];
  };

  /**
   * 构造底部栏内部默认配置集合。
   * @function
   * @returns {Array} 配置集合
   */
  buildBottomBarInnerDefaultConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerDefaultConfigList',
    );

    return [
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };

  /**
   * 构造底部栏内部左侧项配置集合。
   * @function
   * @returns {Array} 配置集合
   * @example
   * buildBottomBarInnerLeftItemConfigList = () => []
   */
  buildBottomBarInnerLeftItemConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerLeftItemConfigList',
      emptyLogic,
    );

    return [];
  };

  /**
   * 构造底部栏内部右侧项配置集合。
   * @function
   * @returns {Array} 配置集合
   */
  buildBottomBarInnerRightItemConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerRightItemConfigList',
    );

    const bottomBarInnerExtraConfigList =
      this.buildBottomBarInnerExtraConfigList();
    const bottomBarInnerDefaultConfigList =
      this.buildBottomBarInnerDefaultConfigList();

    return [
      ...bottomBarInnerExtraConfigList,
      ...bottomBarInnerDefaultConfigList,
    ];
  };

  /**
   * 渲染底部栏右侧部份。
   * @function
   * @returns {Object} 渲染结果
   */
  renderPresetBottomBarRightBox = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetBottomBarRightBox');

    const rightConfigList = this.buildBottomBarInnerRightItemConfigList();

    return this.renderPresetBottomBarInnerBox(rightConfigList);
  };

  /**
   * 渲染底部栏左侧部份。
   * @function
   * @returns {Object} 渲染结果
   */
  renderPresetBottomBarLeftBox = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetBottomBarLeftBox');

    const leftConfigList = this.buildBottomBarInnerLeftItemConfigList();

    return this.renderPresetBottomBarInnerBox(leftConfigList);
  };

  /**
   * 渲染底部栏内部部份。
   * @function
   * @param {Array} configList 配置项集合
   * @returns {Object} 渲染结果
   */
  renderPresetBottomBarInnerBox = (configList) => {
    this.logCallTrack(
      {
        parameter: configList,
      },
      primaryCallName,
      'renderPresetBottomBarInnerBox',
    );

    if (!isArray(configList) || configList.length <= 0) {
      return null;
    }

    const components = [];

    const that = this;

    for (const [index, item] of configList.entries()) {
      if ((item || null) != null) {
        const {
          hidden,
          buildType: itemBuildType,
          icon: itemIcon,
          text: itemText,
          component: itemComponent,
        } = {
          hidden: false,
          buildType: null,
          icon: null,
          text: '',
          component: null,
          ...item,
        };

        let itemHidden = hidden;

        if (
          !hidden &&
          itemBuildType === drawerConfig.bottomBarBuildType.component &&
          (itemComponent || null) == null
        ) {
          itemHidden = true;
        }

        if (!itemHidden) {
          const itemKey = `drawer_bottomBar_button_key_${index}`;

          let itemAdjust = item;

          switch (itemBuildType) {
            case drawerConfig.bottomBarBuildType.close: {
              itemAdjust = this.renderPresetCloseButton(item);
              break;
            }

            case drawerConfig.bottomBarBuildType.save: {
              itemAdjust = this.renderPresetSaveButton({
                ...item,
                handleClick: ({ completeCallback }) => {
                  that.handleOk({ completeCallback });
                },
              });
              break;
            }

            case drawerConfig.bottomBarBuildType.generalButton: {
              itemAdjust = buildButton(item);
              break;
            }

            case cardConfig.extraBuildType.flexSelect: {
              itemAdjust = buildFlexSelect(item);
              break;
            }

            case drawerConfig.bottomBarBuildType.button: {
              itemAdjust = buildButton(item);
              break;
            }

            case drawerConfig.bottomBarBuildType.dropdown: {
              itemAdjust = buildDropdown({
                ...item,
                placement: 'topRight',
              });
              break;
            }

            case drawerConfig.bottomBarBuildType.dropdownButton: {
              itemAdjust = buildDropdownButton({
                ...item,
                placement: 'topRight',
              });
              break;
            }

            case drawerConfig.bottomBarBuildType.dropdownEllipsis: {
              itemAdjust = buildDropdownEllipsis({
                ...item,
                placement: 'topRight',
              });
              break;
            }

            case drawerConfig.bottomBarBuildType.iconInfo: {
              itemAdjust = <IconInfo icon={itemIcon} text={itemText} />;
              break;
            }

            case drawerConfig.bottomBarBuildType.divider: {
              itemAdjust = <Divider type="vertical" />;
              break;
            }

            case drawerConfig.bottomBarBuildType.component: {
              itemAdjust = itemComponent || null;
              break;
            }

            default: {
              itemAdjust = item;
              break;
            }
          }

          components.push(<Fragment key={itemKey}>{itemAdjust}</Fragment>);
        }
      }
    }

    return components;
  };

  /**
   * 渲染底部栏。
   * @function
   * @returns {Object} 渲染结果
   */
  renderPresetBottomBar = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetBottomBar');

    const bottomBarLeftBox = this.renderPresetBottomBarLeftBox();
    const bottomBarRightBox = this.renderPresetBottomBarRightBox();

    return (
      <Footer>
        <div className={styles.bottomBar}>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <FlexBox
                flexAuto="left"
                left={
                  <FlexBox
                    flexAuto="right"
                    style={{
                      height: '100%',
                    }}
                    leftStyle={{
                      height: '100%',
                    }}
                    left={
                      <Space
                        split={<Divider type="vertical" />}
                        style={{ height: '100%' }}
                      >
                        {bottomBarLeftBox}
                      </Space>
                    }
                    right={<div />}
                  />
                }
                right={
                  <Space split={<Divider type="vertical" />}>
                    {bottomBarRightBox}
                  </Space>
                }
              />
            </Col>
          </Row>
        </div>
      </Footer>
    );
  };

  /**
   * 渲染遮罩层内容区域，默认为空，可根据需要重载。
   * @function
   * @returns {Object} 渲染结果
   * @example
   * renderOverlayContent = () => null
   */
  renderOverlayContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderOverlayContent', emptyLogic);

    return null;
  };

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    if (this.showCallProcess) {
      this.logCallTrack({}, primaryCallName, 'renderFurther');
    } else {
      logCallTrack(
        {},
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'renderFurther',
          'showCallProcess',
          toString(this.showCallProcess),
        ),
        {
          color: renderFurtherColorWhenNoCallProcess,
          prefix: renderFurtherPrefixWhenNoCallProcess,
        },
      );
    }

    const {
      width,
      height,
      showBottomBar,
      placement,
      overlayButtonOpenText,
      overlayButtonCloseText,
    } = this.state;
    const { maskClosable } = this.props;

    const that = this;

    return (
      <DrawerExtra
        flag={this.getVisibleFlag()}
        icon={this.renderPresetTitleIcon()}
        titlePrefix={this.buildTitlePrevText()}
        title={this.buildTitleText()}
        subtitle={this.buildTitleSubText()}
        destroyOnClose={this.destroyOnClose || false}
        width={width}
        height={height}
        placement={placement}
        maskClosable={isUndefined(maskClosable) ? false : maskClosable}
        overlayContent={this.renderOverlayContent()}
        overlayButtonOpenText={overlayButtonOpenText}
        overlayButtonCloseText={overlayButtonCloseText}
        onClose={this.onClose}
        styles={{
          header: this.adjustHeaderStyle(),
          body: {
            padding: 0,
            overflow: 'hidden',
          },
        }}
        extra={this.buildExtraAction()}
        afterOpenChange={(v) => {
          that.doOtherWhenChangeVisible(v);
        }}
      >
        <div className={styles.mainContainor}>
          <Layout style={{ height: '100%' }}>
            <Content>{this.renderPresetContentContainor()}</Content>

            {showBottomBar ? this.renderPresetBottomBar() : null}
          </Layout>

          {this.renderPresetOther()}
        </div>
      </DrawerExtra>
    );
  }
}

Base.defaultProps = {
  flag: '',
};

export { Base };
