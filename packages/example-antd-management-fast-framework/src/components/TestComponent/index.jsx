import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { LoadingOverlay } from 'antd-management-fast-framework';

import { testModelLoadingFlag } from '../../customConfig';

@connect(({ testModel }) => ({
  testModel,
}))
class TestComponent extends PureComponent {
  render() {
    const {
      testModel: { simpleText },
    } = this.props;

    return (
      <LoadingOverlay flag={testModelLoadingFlag}>
        <div>{simpleText}</div>
      </LoadingOverlay>
    );
  }
}

TestComponent.defaultProps = {};

export { TestComponent };
