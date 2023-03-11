import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { LoadingOverlay } from 'antd-management-fast-framework';

@connect(({ testModel }) => ({
  testModel,
}))
class TestComponent extends PureComponent {
  render() {
    const {
      testModel: { simpleText },
    } = this.props;

    return (
      <LoadingOverlay>
        <div>{simpleText}</div>
      </LoadingOverlay>
    );
  }
}

TestComponent.defaultProps = {};

export { TestComponent };
