import { Affix, Col, Divider, Drawer, Form, Layout, Row, Space } from 'antd';
import React, { Fragment } from 'react';

import {
  cardConfig,
  drawerConfig,
} from 'antd-management-fast-common/es/utils/constants';
import {
  defaultFormState,
  isArray,
  isFunction,
  isUndefined,
} from 'antd-management-fast-common/es/utils/tools';
import FlexBox from 'antd-management-fast-component/es/customComponents/FlexBox';
import {
  buildButton,
  buildCustomSelect,
  buildDropdown,
  buildDropdownButton,
  buildDropdownEllipsis,
} from 'antd-management-fast-component/es/customComponents/FunctionComponent';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';
import IconInfo from 'antd-management-fast-component/es/customComponents/IconInfo';

import BaseWindow from '../../DataOperation/BaseWindow';

import styles from './index.less';

const { Footer, Content } = Layout;

class Base extends BaseWindow {
  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        title: '',
        width: 820,
        height: 256,
        visible: false,
        dataLoading: false,
        showBottomBar: false,
        submitApiPath: '',
        placement: 'right',
      },
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

  renderTitleIcon = () => iconBuilder.form();

  renderTitle = () => {
    const prevText = this.buildTitlePrevText();
    let subText = this.buildTitleSubText();

    subText = checkStringIsNullOrWhiteSpace(subText) ? '' : `：【${subText}】`;

    return `${prevText}${this.buildTitleText() || '信息详情'}${subText}`;
  };

  buildFormLayout = () => {
    return 'vertical';
  };

  buildNotificationPlacement = () => {
    return `bottomLeft`;
  };

  renderForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    const otherFormProps = this.establishFormAdditionalConfig();

    return (
      <Form
        ref={this.formRef}
        initialValues={initialValues}
        className={this.getFormClassName()}
        layout={this.buildFormLayout()}
        {...otherFormProps}
      >
        {this.formContent()}
      </Form>
    );
  };

  establishCardCollectionConfig = () => {
    return null;
  };

  establishWrapperTypeConfig = () => {
    return { mode: cardConfig.wrapperType.drawer };
  };

  formContent = () => {
    return this.buildCardCollection(this.establishCardCollectionConfig());
  };

  renderContentContainor = () => {
    return <div className={styles.contentContainor}>{this.renderForm()}</div>;
  };

  renderCloseButton = (option) => {
    const o = {
      ...{
        type: 'default',
        icon: iconBuilder.closeCircle(),
        text: '关闭',
      },
      ...(option || {}),
      ...{
        handleClick: () => {
          this.onClose();
        },
      },
    };

    return this.renderGeneralButton(o);
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

  renderBottomBarRightBox = () => {
    const rightConfigList = this.buildBottomBarInnerRightItemConfigList();

    return this.renderBottomBarInnerBox(rightConfigList);
  };

  renderBottomBarLeftBox = () => {
    const leftConfigList = this.buildBottomBarInnerLeftItemConfigList();

    return this.renderBottomBarInnerBox(leftConfigList);
  };

  renderBottomBarInnerBox = (configList) => {
    if (!isArray(configList) || configList.length <= 0) {
      return null;
    }

    const components = [];

    const that = this;

    configList.forEach((item, index) => {
      if ((item || null) != null) {
        const {
          hidden,
          buildType: itemBuildType,
          icon: itemIcon,
          text: itemText,
          component: itemComponent,
        } = {
          ...{
            hidden: false,
            buildType: null,
            icon: null,
            text: '',
            component: null,
          },
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
            case drawerConfig.bottomBarBuildType.close:
              itemAdjust = this.renderCloseButton(item);
              break;

            case drawerConfig.bottomBarBuildType.save:
              itemAdjust = this.renderSaveButton({
                ...item,
                ...{
                  handleClick: (e) => {
                    that.handleOk(e);
                  },
                },
              });
              break;

            case drawerConfig.bottomBarBuildType.generalButton:
              itemAdjust = this.renderGeneralButton(item);
              break;

            case cardConfig.extraBuildType.flexSelect:
              itemAdjust = buildCustomSelect(item);
              break;

            case drawerConfig.bottomBarBuildType.button:
              itemAdjust = buildButton(item);
              break;

            case drawerConfig.bottomBarBuildType.dropdown:
              itemAdjust = buildDropdown({
                ...item,
                ...{ placement: 'topRight' },
              });
              break;

            case drawerConfig.bottomBarBuildType.dropdownButton:
              itemAdjust = buildDropdownButton({
                ...item,
                ...{ placement: 'topRight' },
              });
              break;

            case drawerConfig.bottomBarBuildType.dropdownEllipsis:
              itemAdjust = buildDropdownEllipsis({
                ...item,
                ...{ placement: 'topRight' },
              });
              break;

            case drawerConfig.bottomBarBuildType.iconInfo:
              itemAdjust = <IconInfo icon={itemIcon} text={itemText} />;
              break;

            case drawerConfig.bottomBarBuildType.component:
              itemAdjust = itemComponent || null;
              break;

            default:
              itemAdjust = item;
              break;
          }

          components.push(<Fragment key={itemKey}>{itemAdjust}</Fragment>);
        }
      }
    });

    return components;
  };

  renderBottomBar = () => {
    const bottomBarLeftBox = this.renderBottomBarLeftBox();
    const bottomBarRightBox = this.renderBottomBarRightBox();

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

    const titleIcon = this.renderTitleIcon();

    return (
      <Drawer
        title={
          <span>
            {titleIcon}
            {titleIcon ? (
              <>
                <span className={styles.titleText} /> {this.renderTitle()}
              </>
            ) : (
              this.renderTitle()
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
            <Content>{this.renderContentContainor()}</Content>
            {showBottomBar ? this.renderBottomBar() : null}
          </Layout>

          {this.renderOther()}
        </div>
      </Drawer>
    );
  }
}

export default Base;
