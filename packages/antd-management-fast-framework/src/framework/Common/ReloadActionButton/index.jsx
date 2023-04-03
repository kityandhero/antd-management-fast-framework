import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { ElasticityButton, iconBuilder } from 'antd-management-fast-component';

export const ReloadActionButtonLoadingFlag = '72a989153e5b433fa53408cf88db5c42';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ReloadActionButton extends PureComponent {
  render() {
    const { switchControl, title, onReload } = this.props;

    const flag = !!switchControl[ReloadActionButtonLoadingFlag];

    return (
      <ElasticityButton
        title={title}
        disabled={flag}
        type="dashed"
        text=""
        icon={flag ? iconBuilder.loading() : iconBuilder.reload()}
        handleClick={(event) => {
          if (isFunction(onReload)) {
            onReload(event);
          }
        }}
      />
    );
  }
}

ReloadActionButton.defaultProps = {
  title: '刷新当前数据',
  onReload: null,
};

export { ReloadActionButton };
