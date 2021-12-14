import React, { Fragment } from 'react';
import { Layout, Drawer, Form, Space, Row, Col, Affix, Divider } from 'antd';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons';

import {
  isUndefined,
  isFunction,
  defaultFormState,
  stringIsNullOrWhiteSpace,
  isArray,
} from '../../../utils/tools';
import { cardConfig, drawerConfig } from '../../../utils/constants';
import IconInfo from '../../../customComponents/IconInfo';
import ColorText from '../../../customComponents/ColorText';
import {
  buildButton,
  buildButtonGroup,
  buildDropdownEllipsis,
  buildDropdown,
  buildDropdownButton,
  buildCustomSelect,
} from '../../../customComponents/FunctionComponent';

import BaseWindow from '../../DataOperation/BaseWindow';

import styles from './index.less';

const { Footer, Content } = Layout;

class Base extends BaseWindow {
  showExtraActionDivider = true;

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

  establishExtraActionConfig = () => null;

  establishExtraActionGroupConfig = () => null;

  establishExtraActionEllipsisConfig = () => null;

  buildExtraAction = () => {
    const listAction = [];
    const { keyPrefix, list: configList } = {
      ...{
        keyPrefix: '',
        list: [],
      },
      ...this.establishExtraActionConfig(),
    };

    (isArray(configList) ? configList : []).forEach((item, index) => {
      if ((item || null) != null) {
        const {
          hidden,
          buildType,
          component: componentSource,
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

        if (!hidden) {
          const itemKey = `${keyPrefix || 'drawerExtraActionItem'}_${index}`;

          let itemAdjust = item;

          switch (buildType) {
            case drawerConfig.extraBuildType.flexSelect:
              itemAdjust = buildCustomSelect(item);
              break;

            case drawerConfig.extraBuildType.button:
              itemAdjust = buildButton(item);
              break;

            case drawerConfig.extraBuildType.dropdown:
              itemAdjust = buildDropdown(item);
              break;

            case drawerConfig.extraBuildType.dropdownButton:
              itemAdjust = buildDropdownButton(item);
              break;

            case drawerConfig.extraBuildType.dropdownEllipsis:
              itemAdjust = buildDropdownEllipsis(item);
              break;

            case drawerConfig.extraBuildType.iconInfo:
              itemAdjust = <IconInfo {...item} />;
              break;

            case drawerConfig.extraBuildType.colorText:
              itemAdjust = <ColorText {...item} />;
              break;

            case drawerConfig.extraBuildType.component:
              itemAdjust = componentSource || null;
              break;

            default:
              recordObject({
                message: '未找到匹配的构建模式',
                config: item,
              });

              itemAdjust = null;
              break;
          }

          listAction.push(<Fragment key={itemKey}>{itemAdjust}</Fragment>);
        }
      }
    });

    const buttonGroupData = this.establishExtraActionGroupConfig();

    if ((buttonGroupData || null) != null) {
      const buttonGroup = buildButtonGroup(buttonGroupData);

      if ((buttonGroup || null) != null) {
        listAction.push(
          <Fragment key={`${keyPrefix || 'drawerExtraActionItem'}_buttonGroup`}>
            {buttonGroup}
          </Fragment>,
        );
      }
    }

    const ellipsisActionData = this.establishExtraActionEllipsisConfig();

    if ((ellipsisActionData || null) != null) {
      const dropdownEllipsis = buildDropdownEllipsis(ellipsisActionData);

      if ((dropdownEllipsis || null) != null) {
        listAction.push(
          <Fragment
            key={`${keyPrefix || 'drawerExtraActionItem'}_dropdownEllipsis`}
          >
            {dropdownEllipsis}
          </Fragment>,
        );
      }
    }

    return (
      <Space
        split={
          !!this.showExtraActionDivider || false ? (
            <Divider type="vertical" />
          ) : null
        }
      >
        {listAction.map((o) => o)}
      </Space>
    );
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
        icon: <CloseCircleOutlined />,
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
        visible={visible || false}
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
