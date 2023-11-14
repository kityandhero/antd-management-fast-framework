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

class Base extends BaseWindow {
  contentWrapperType = contentConfig.wrapperType.drawer;

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

  adjustHeaderStyle = () => {
    this.logCallTrack({}, primaryCallName, 'adjustHeaderStyle', emptyLogic);

    return {};
  };

  buildTitlePrevText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitlePrevText', emptyLogic);

    return '';
  };

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

  buildTitleSubText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleSubText', emptyLogic);

    return '';
  };

  renderPresetTitleIcon = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetTitleIcon', emptyLogic);

    return null;
  };

  buildNotificationPlacement = () => {
    this.logCallTrack({}, primaryCallName, 'buildNotificationPlacement');

    return `bottomLeft`;
  };

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

  renderPresetContentContainor = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentContainor');

    return (
      <div className={styles.contentContainor}>
        {this.renderPresetContentContainorInner()}
      </div>
    );
  };

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

  buildBottomBarInnerExtraConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerExtraConfigList',
      emptyLogic,
    );

    return [];
  };

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

  buildBottomBarInnerLeftItemConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerLeftItemConfigList',
      emptyLogic,
    );

    return [];
  };

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

  renderPresetBottomBarRightBox = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetBottomBarRightBox');

    const rightConfigList = this.buildBottomBarInnerRightItemConfigList();

    return this.renderPresetBottomBarInnerBox(rightConfigList);
  };

  renderPresetBottomBarLeftBox = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetBottomBarLeftBox');

    const leftConfigList = this.buildBottomBarInnerLeftItemConfigList();

    return this.renderPresetBottomBarInnerBox(leftConfigList);
  };

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

  renderOverlayContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderOverlayContent', emptyLogic);

    return null;
  };

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
