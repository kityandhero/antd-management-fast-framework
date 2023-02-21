import { FloatButton } from 'antd';
import React from 'react';

import { BaseUpdateForm } from '../BaseUpdateForm';

const { BackTop } = FloatButton;

class BaseUpdateFormContent extends BaseUpdateForm {
  renderFurther() {
    return (
      <>
        {this.renderPresetFormWrapper()}

        {this.renderPresetOther()}

        <BackTop />
      </>
    );
  }
}

export { BaseUpdateFormContent };
