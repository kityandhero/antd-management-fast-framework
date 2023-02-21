import { Affix, Col, Divider, Drawer, Form, Layout, Row, Space } from 'antd';
import React, { Fragment } from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  isUndefined,
} from 'easy-soft-utility';

import {
  cardConfig,
  defaultFormState,
  drawerConfig,
} from 'antd-management-fast-common';
import {
  buildButton,
  buildCustomSelect,
  buildDropdown,
  buildDropdownButton,
  buildDropdownEllipsis,
  FlexBox,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

import { BaseWindow } from '../../DataOperation/BaseWindow';

import styles from './index.less';

const { Footer, Content } = Layout;

class Base extends BaseWindow {
  constructor(properties) {
    super(properties);

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
    };
  }

  onClose = () => {
    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      afterClose();
    }
  };

  buildTitlePrevText = () => {
    return '';
  };

  buildTitleText = () => {
    const { pageName } = this.state;

    return pageName;
  };

  buildTitleSubText = () => {
    return '';
  };

  renderPresetTitleIcon = () => iconBuilder.form();

  renderPresetTitle = () => {
    const previousText = this.buildTitlePrevText();
    let subText = this.buildTitleSubText();

    subText = checkStringIsNullOrWhiteSpace(subText) ? '' : `：【${subText}】`;

    return `${previousText}${this.buildTitleText() || '信息详情'}${subText}`;
  };

  buildFormLayout = () => {
    return 'vertical';
  };

  buildNotificationPlacement = () => {
    return `bottomLeft`;
  };

  renderPresetForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    const otherFormProperties = this.establishFormAdditionalConfig();

    return (
      <Form
        ref={this.formRef}
        initialValues={initialValues}
        className={this.getFormClassName()}
        layout={this.buildFormLayout()}
        {...otherFormProperties}
      >
        {this.renderPresetFormContent()}
      </Form>
    );
  };

  establishCardCollectionConfig = () => {
    return null;
  };

  establishWrapperTypeConfig = () => {
    return { mode: cardConfig.wrapperType.drawer };
  };

  renderPresetFormContent = () => {
    return this.buildCardCollection(this.establishCardCollectionConfig());
  };

  renderPresetContentContainor = () => {
    return (
      <div className={styles.contentContainor}>{this.renderPresetForm()}</div>
    );
  };

  renderPresetCloseButton = (option) => {
    const o = {
      type: 'default',
      icon: iconBuilder.closeCircle(),
      text: '关闭',
      ...option,

      handleClick: () => {
        this.onClose();
      },
    };

    return this.renderPresetGeneralButton(o);
  };

  buildBottomBarInnerExtraConfigList = () => {
    return [];
  };

  buildBottomBarInnerDefaultConfigList = () => {
    return [
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };

  buildBottomBarInnerLeftItemConfigList = () => {
    return [];
  };

  buildBottomBarInnerRightItemConfigList = () => {
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
    const rightConfigList = this.buildBottomBarInnerRightItemConfigList();

    return this.renderPresetBottomBarInnerBox(rightConfigList);
  };

  renderPresetBottomBarLeftBox = () => {
    const leftConfigList = this.buildBottomBarInnerLeftItemConfigList();

    return this.renderPresetBottomBarInnerBox(leftConfigList);
  };

  renderPresetBottomBarInnerBox = (configList) => {
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
                handleClick: (error) => {
                  that.handleOk(error);
                },
              });
              break;
            }

            case drawerConfig.bottomBarBuildType.generalButton: {
              itemAdjust = this.renderPresetGeneralButton(item);
              break;
            }

            case cardConfig.extraBuildType.flexSelect: {
              itemAdjust = buildCustomSelect(item);
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
    const bottomBarLeftBox = this.renderPresetBottomBarLeftBox();
    const bottomBarRightBox = this.renderPresetBottomBarRightBox();

    return (
      <Footer>
        <Affix offsetBottom={0}>
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
        </Affix>
      </Footer>
    );
  };

  renderFurther() {
    const { visible, width, height, showBottomBar, placement } = this.state;
    const { maskClosable } = this.props;

    const titleIcon = this.renderPresetTitleIcon();

    return (
      <Drawer
        title={
          <span>
            {titleIcon}
            {titleIcon ? (
              <>
                <span className={styles.titleText} /> {this.renderPresetTitle()}
              </>
            ) : (
              this.renderPresetTitle()
            )}
          </span>
        }
        destroyOnClose={false}
        width={width}
        height={height}
        placement={placement}
        open={visible || false}
        maskClosable={isUndefined(maskClosable) ? false : maskClosable}
        onClose={this.onClose}
        bodyStyle={{
          padding: 0,
        }}
        extra={this.buildExtraAction()}
      >
        <div className={styles.mainContainor}>
          <Layout>
            {/* <Header>Header</Header> */}
            <Content>{this.renderPresetContentContainor()}</Content>
            {showBottomBar ? this.renderPresetBottomBar() : null}
          </Layout>

          {this.renderPresetOther()}
        </div>
      </Drawer>
    );
  }
}

export { Base };
