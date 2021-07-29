import React from 'react';
import { Form, Tooltip, Button, Avatar, Space, BackTop } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  LoadingOutlined,
  ReloadOutlined,
  PlusOutlined,
  RollbackOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  showRuntimeErrorMessage,
} from '../../../utils/tools';
import {
  buildButtonGroup,
  buildDropdownEllipsis,
} from '../../../customComponents/FunctionComponent';

import BaseView from '../../DataOperation/BaseView';

import styles from './index.less';

class DataCore extends BaseView {
  enableActionBack = true;

  reloadByUrlOp = false;

  needSetFormValueAfterLoad = true;

  actionBackProps = {};

  formRef = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  setFormFieldsValue = v => {
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterSetFieldsValue = v => {};

  getTargetForm = () => {
    return this.formRef.current;
  };

  pageHeaderLogo = () => <Avatar shape="square" icon={<PlusOutlined />} />;

  pageHeaderActionExtraGroup = () => null;

  pageHeaderActionExtraEllipsis = () => null;

  pageHeaderActionBack = () => {
    const { backPath } = this.state;

    if (!this.enableActionBack) {
      return null;
    }

    if ((backPath || '') === '') {
      return null;
    }

    const props = {
      ...{ icon: <RollbackOutlined />, type: 'dashed' },
      ...(this.actionBackProps || {}),
    };

    return (
      <Tooltip placement="top" title="返回列表页">
        <Button
          {...props}
          onClick={e => {
            this.backToList(e);
          }}
        >
          列表页
        </Button>
      </Tooltip>
    );
  };

  pageHeaderAction = () => {
    const { dataLoading, reloading, refreshing, showReloadButton } = this.state;

    const buttonGroupData = this.pageHeaderActionExtraGroup();
    const ellipsisActionData = this.pageHeaderActionExtraEllipsis();

    return (
      <Space>
        {buildButtonGroup(buttonGroupData)}

        {buildDropdownEllipsis(ellipsisActionData)}

        {this.pageHeaderActionBack()}

        {showReloadButton ? (
          <Tooltip placement="top" title="刷新">
            <Button
              disabled={dataLoading || reloading || refreshing}
              type="dashed"
              onClick={() => {
                this.reloadData();
              }}
            >
              {reloading || refreshing ? (
                <LoadingOutlined />
              ) : (
                <ReloadOutlined />
              )}
            </Button>
          </Tooltip>
        ) : null}
      </Space>
    );
  };

  buildInitialValues = (
    // eslint-disable-next-line no-unused-vars
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  ) => {
    if (this.loadDataAfterMount) {
      if (this.needSetFormValueAfterLoad) {
        showRuntimeErrorMessage('buildInitialValues 方法需要重新实现。');

        return {};
      }

      return {};
    }

    return {};
  };

  buildFormLayout = () => {
    return 'vertical';
  };

  getFormClassName = () => {
    return null;
  };

  renderMainTitleIcon = () => {
    return <ContactsOutlined />;
  };

  renderMainTitleText = () => {
    return '基本信息';
  };

  renderMainTitle = () => {
    return (
      <>
        {this.renderMainTitleIcon()}
        <span className={styles.cardTitle}> {this.renderMainTitleText()}</span>
      </>
    );
  };

  renderFormWrapper = () => {
    return this.renderForm();
  };

  renderForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );

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

  formContent = () => {
    return this.buildFormContent(this.formContentConfigData());
  };

  render() {
    const { pageName } = this.state;

    return (
      <PageHeaderWrapper title={pageName} logo={this.pageHeaderLogo()}>
        <div className={styles.containorBox}>
          {this.renderFormWrapper()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default DataCore;
