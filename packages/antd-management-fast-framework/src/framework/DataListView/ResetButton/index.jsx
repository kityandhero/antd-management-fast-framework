import { Button } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ResetButton extends PureComponent {
  render() {
    const { switchControl, loadingFlag, resettingFlag, text, onReset } =
      this.props;

    const loading = !!switchControl[loadingFlag];
    const resetting = !!switchControl[resettingFlag];

    console.log({
      resettingFlag,
      resetting,
      switchControl,
    });

    const showLoadingIcon = loading && resetting ? true : false;

    return (
      <Button
        disabled={loading || resetting}
        style={{ marginLeft: 8 }}
        onClick={(event) => {
          if (isFunction(onReset)) {
            onReset(event);
          }
        }}
      >
        {showLoadingIcon ? iconBuilder.loading() : iconBuilder.reload()}
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
