import { FloatButton } from 'antd';
import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';

const { BackTop } = FloatButton;

class BaseUpdateFormContent extends BaseUpdateForm {
  renderFurther() {
    return (
      <>
        {this.renderFormWrapper()}

        {this.renderOther()}

        <BackTop />
      </>
    );
  }
}

export default BaseUpdateFormContent;
