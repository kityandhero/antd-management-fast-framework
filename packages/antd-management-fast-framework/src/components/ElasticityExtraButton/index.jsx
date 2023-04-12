import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { ElasticityButton } from 'antd-management-fast-component';

import { switchControlAssist } from '../../utils/switchControlAssist';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ElasticityExtraButton extends PureComponent {
  render() {
    const { switchControl, flag, interimIcon, icon, disabled, ...rest } =
      this.props;

    const checkResult = switchControlAssist.check(switchControl, flag);

    return (
      <ElasticityButton
        {...rest}
        disabled={disabled || checkResult}
        icon={interimIcon && checkResult ? interimIcon : icon}
      />
    );
  }
}

ElasticityExtraButton.defaultProps = {
  flag: '',
  interimIcon: null,
  ...ElasticityButton.defaultProps,
};

export { ElasticityExtraButton };
