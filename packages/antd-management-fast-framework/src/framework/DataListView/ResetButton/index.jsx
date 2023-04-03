import { Button } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { viewLoadingFlag, viewSearchingFlag } from '../../../customConfig';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ResetButton extends PureComponent {
  render() {
    const { switchControl, text, onReset } = this.props;

    const loading = !!switchControl[viewLoadingFlag];
    const searching = !!switchControl[viewSearchingFlag];

    return (
      <Button
        disabled={loading}
        style={{ marginLeft: 8 }}
        onClick={(event) => {
          if (isFunction(onReset)) {
            onReset(event);
          }
        }}
      >
        {searching ? iconBuilder.loading() : iconBuilder.reload()}
        {text}
      </Button>
    );
  }
}

ResetButton.defaultProps = {
  text: '重置',
  onReset: null,
};

export { ResetButton };
