import React from 'react';
import { connect } from '@umijs/max';

import { BaseComponent } from 'antd-management-fast-component';

@connect(({ testModel }) => ({
  testModel,
}))
class TestComponent extends BaseComponent {
  renderFurther() {
    return <div>11111</div>;
  }
}

TestComponent.defaultProps = {};

export { TestComponent };
