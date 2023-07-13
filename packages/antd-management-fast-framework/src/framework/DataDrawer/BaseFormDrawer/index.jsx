import { Form } from 'antd';
import React from 'react';

import { emptyLogic } from 'antd-management-fast-common';

import { Base } from '../Base';

const primaryCallName = 'DataDrawer::Base';

class BaseFormDrawer extends Base {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  establishCardCollectionConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishCardCollectionConfig',
      emptyLogic,
    );

    return null;
  };

  buildFormLayout = () => {
    this.logCallTrack({}, primaryCallName, 'buildFormLayout');

    return 'vertical';
  };

  renderPresetFormContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetFormContent');

    return this.buildCardCollectionArea(this.establishCardCollectionConfig());
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

  renderPresetContentContainorInner = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentContainorInner');

    return this.renderPresetForm();
  };
}

BaseFormDrawer.defaultProps = {};

export { BaseFormDrawer };
