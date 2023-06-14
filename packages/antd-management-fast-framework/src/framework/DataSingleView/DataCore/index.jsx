import { Avatar, Button, Form, Tooltip } from 'antd';
import React from 'react';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import {
  avatarImageLoadResultCollection,
  iconBuilder,
} from 'antd-management-fast-component';

import { BaseView } from '../../DataOperation/BaseView';

import styles from './index.less';

const primaryCallName = 'DataSingleView::DataCore';

class DataCore extends BaseView {
  enableActionBack = true;

  actionBackProps = {};

  formRef = React.createRef();

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      avatarImageLoadResult: avatarImageLoadResultCollection.wait,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  setFormFieldsValue = (v) => {
    this.logCallTrack(
      {
        parameter: v,
      },
      primaryCallName,
      'setFormFieldsValue',
    );

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterSetFieldsValue = (value) => {};

  getTargetForm = () => {
    return this.formRef.current;
  };

  onPageHeaderAvatarLoadError = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  establishPageHeaderAvatarConfig = () => {
    return null;
  };

  establishPageHeaderTagCollectionConfig = () => [];

  establishPageHeaderExtraContentConfig = () => null;

  pageHeaderLogo = () => <Avatar shape="square" icon={iconBuilder.plus()} />;

  buildExtraBackAction = () => {
    this.logCallTrack({}, primaryCallName, 'buildExtraBackAction');

    const { backPath } = this.state;

    if (!this.enableActionBack) {
      return null;
    }

    if ((backPath || '') === '') {
      return null;
    }

    const properties = {
      icon: iconBuilder.rollback(),
      type: 'dashed',
      ...this.actionBackProps,
    };

    return (
      <Tooltip placement="top" title="返回列表页">
        <Button
          {...properties}
          onClick={(event) => {
            this.backToList(event);
          }}
        >
          列表页
        </Button>
      </Tooltip>
    );
  };

  buildFormLayout = () => {
    this.logCallTrack({}, primaryCallName, 'buildFormLayout');

    return 'vertical';
  };

  getFormClassName = () => {
    return null;
  };

  renderPresetMainTitleIcon = () => {
    return iconBuilder.contacts();
  };

  renderPresetMainTitleText = () => {
    return '基本信息';
  };

  renderPresetMainTitle = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetMainTitle');

    return (
      <>
        {this.renderPresetMainTitleIcon()}

        <span className={styles.cardTitle}>
          {this.renderPresetMainTitleText()}
        </span>
      </>
    );
  };

  renderPresetFormWrapper = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetFormWrapper');

    return this.renderPresetForm();
  };

  renderPresetContentArea = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentArea');

    return this.renderPresetFormWrapper();
  };

  renderPresetForm = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetForm');

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

  renderPresetFormContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetFormContent');

    return this.buildCardCollectionArea(this.establishCardCollectionConfig());
  };
}

export { DataCore };
