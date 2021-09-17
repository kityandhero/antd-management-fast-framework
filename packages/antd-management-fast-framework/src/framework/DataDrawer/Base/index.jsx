import React from 'react';
import { Layout, Drawer, Form, Button, Row, Col, Affix } from 'antd';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons';

import {
  isUndefined,
  isFunction,
  defaultFormState,
} from '../../../utils/tools';
import { formContentConfig } from '../../../utils/constants';

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
    return { mode: formContentConfig.wrapperType.drawer };
  };

  formContent = () => {
    return this.buildFormContent(this.formContentConfigData());
  };

  renderContentContainor = () => {
    return <div className={styles.contentContainor}>{this.renderForm()}</div>;
  };

  renderButton = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="default"
          disabled={dataLoading || processing}
          onClick={() => {
            this.onClose();
          }}
        >
          <CloseCircleOutlined />
          关闭
        </Button>
      </>
    );
  };

  renderBottomBar = () => {
    return (
      <Footer>
        <Affix offsetBottom={0}>
          <div className={styles.bottomBar}>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                {this.renderButton()}
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
