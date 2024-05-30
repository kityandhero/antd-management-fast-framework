import { Form } from 'antd';
import React from 'react';

import { emptyLogic } from 'antd-management-fast-common';

import { Base } from '../Base';

const primaryCallName = 'DataDrawer::Base';

class BaseFormDrawer extends Base {
  /**
   * @constructs
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  /**
   * 构造 Card 配置集合。
   * @function
   * @example
   * establishCardCollectionConfig = () => null
   */
  establishCardCollectionConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishCardCollectionConfig',
      emptyLogic,
    );

    return null;
  };

  /**
   * 配置表单布局。
   * @function
   * @returns {string} 'vertical'
   */
  buildFormLayout = () => {
    this.logCallTrack({}, primaryCallName, 'buildFormLayout');

    return 'vertical';
  };

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
