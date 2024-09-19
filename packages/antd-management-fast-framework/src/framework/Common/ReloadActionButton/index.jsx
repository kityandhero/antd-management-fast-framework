import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { ElasticityButton, iconBuilder } from 'antd-management-fast-component';

import { switchControlAssist } from '../../../utils/switchControlAssist';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ReloadActionButton extends PureComponent {
  getProperties = () => {
    return {
      title: '刷新当前数据',
      onReload: null,
      ...this.props,
    };
  };

  render() {
    const { switchControl, flag, title, onReload } = this.getProperties();

    const checkResult = switchControlAssist.check(switchControl, flag);

    return (
      <ElasticityButton
        title={title}
        disabled={checkResult}
        type="dashed"
        text=""
        icon={checkResult ? iconBuilder.loading() : iconBuilder.reload()}
        handleClick={(event) => {
          if (isFunction(onReload)) {
            onReload(event);
          }
        }}
      />
    );
  }
}

export { ReloadActionButton };
