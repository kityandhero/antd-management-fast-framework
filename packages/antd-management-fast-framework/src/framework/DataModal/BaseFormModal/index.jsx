import { Form } from 'antd';
import React from 'react';

import { Base } from '../Base';

const primaryCallName = 'DataModal::BaseFormModal';

class BaseFormModal extends Base {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  /**
   * 渲染表单内容。
   * @function
   */
  renderPresetFormContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetFormContent');

    return this.buildCardCollectionArea(this.establishCardCollectionConfig());
  };

  /**
   * 渲染表单。
   * @function
   */
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
        layout={this.buildFormLayout()}
        initialValues={initialValues}
        className={this.getFormClassName()}
        {...otherFormProperties}
      >
        {this.renderPresetFormContent()}
      </Form>
    );
  };

  renderPresetFormWrapper = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetFormWrapper');

    return this.renderPresetForm();
  };

  renderPresetContentContainorInner = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentContainorInner');

    return this.renderPresetFormWrapper();
  };

  /**
   * 渲染 Modal 内部区域。
   * @function
   * @return {Object} 渲染结果。
   */
  renderPresetModalInner = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetModalInner');

    return this.renderPresetContentContainorInner();
  };
}

export { BaseFormModal };
