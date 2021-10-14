import React, { Fragment } from 'react';
import { Layout, Drawer, Form, Space, Row, Col, Affix, Divider } from 'antd';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons';

import {
  isUndefined,
  isFunction,
  defaultFormState,
  stringIsNullOrWhiteSpace,
} from '../../../utils/tools';
import { cardConfig, drawerConfig } from '../../../utils/constants';
import { buildButton } from '../../../customComponents/FunctionComponent';

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

  renderTitleIcon = () => <FormOutlined />;

  renderTitle = () => {
    const prevText = this.buildTitlePrevText();
    let subText = this.buildTitleSubText();

    subText = stringIsNullOrWhiteSpace(subText) ? '' : `：【${subText}】`;

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

    const otherFormProps = this.buildOtherFormProps();

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

  formContentConfigData = () => {
    return null;
  };

  buildWrapperTypeConfig = () => {
    return { mode: cardConfig.wrapperType.drawer };
  };

  formContent = () => {
    return this.buildCardCollection(this.formContentConfigData());
  };

  renderContentContainor = () => {
    return <div className={styles.contentContainor}>{this.renderForm()}</div>;
  };

  renderCloseButton = (option) => {
    const o = {
      ...{
        type: 'default',
        icon: <CloseCircleOutlined />,
        text: '关闭',
      },
      ...(option || {}),
      ...{
        onClick: () => {
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

  buildBottomBarInnerItemConfigList = () => {
    const bottomBarInnerExtraConfigList =
      this.buildBottomBarInnerExtraConfigList();
    const bottomBarInnerDefaultConfigList =
      this.buildBottomBarInnerDefaultConfigList();

    return [
      ...bottomBarInnerExtraConfigList,
      ...bottomBarInnerDefaultConfigList,
    ];
  };

  renderBottomBarInner = () => {
    const components = [];

    const configList = this.buildBottomBarInnerItemConfigList();

    const that = this;

    configList.forEach((item, index) => {
      if ((item || null) != null) {
        const {
          hidden: itemHidden,
          buildType: itemBuildType,
          icon: itemIcon,
          text: itemText,
        } = {
          ...{ hidden: false, buildType: null, icon: null, text: '' },
          ...item,
        };

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
                  onClick: (e) => {
                    that.handleOk(e);
                  },
                },
              });
              break;

            case drawerConfig.bottomBarBuildType.generalButton:
              itemAdjust = this.renderGeneralButton(item);
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
    return (
      <Footer>
        <Affix offsetBottom={0}>
          <div className={styles.bottomBar}>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Space split={<Divider type="vertical" />}>
                  {this.renderBottomBarInner()}
                </Space>
              </Col>
            </Row>
          </div>
        </Affix>
      </Footer>
    );
  };

  render() {
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
        visible={visible || false}
        maskClosable={isUndefined(maskClosable) ? false : maskClosable}
        onClose={this.onClose}
        bodyStyle={{
          padding: 0,
        }}
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
