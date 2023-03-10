import React from 'react';

import { connect } from 'easy-soft-dva';

import { BaseComponent } from 'antd-management-fast-component';
import { LoadingOverlay } from 'antd-management-fast-framework';

@connect(({ testModel }) => ({
  testModel,
}))
class TestComponent extends BaseComponent {
  renderFurther() {
    const {
      testModel: { simpleText },
    } = this.props;

    console.log({ simpleText, props: this.props });

    return <LoadingOverlay>{simpleText}</LoadingOverlay>;
  }
}

TestComponent.defaultProps = {};

export { TestComponent };
