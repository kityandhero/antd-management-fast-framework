import React from 'react';

import { ApplicationProvider } from 'easy-soft-dva';

import { BaseComponent } from 'antd-management-fast-component';

class ApplicationWrapper extends BaseComponent {
  renderFurther() {
    return <ApplicationProvider>{this.props.children}</ApplicationProvider>;
  }
}

ApplicationWrapper.defaultProps = {
  prepareModel: null,
};

export { ApplicationWrapper };
