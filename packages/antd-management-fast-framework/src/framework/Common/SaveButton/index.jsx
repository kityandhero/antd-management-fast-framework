import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { ElasticityButton } from 'antd-management-fast-component';

import { switchControlAssist } from '../../../utils/switchControlAssist';

export const processingFlag = 'a0cd670e26de4ba1866c5a0f077398c9';

@connect(({ switchControl }) => ({
  switchControl,
}))
class SaveButton extends PureComponent {
  render() {
    const { switchControl, disabled, handleClick, ...rest } = this.props;

    const flag = !!switchControl[processingFlag];

    return (
      <ElasticityButton
        {...rest}
        disabled={disabled || flag}
        processing={flag}
        handleClick={() => {
          if (isFunction(handleClick)) {
            switchControlAssist.open(processingFlag, 'Common::SaveButton');

            handleClick({
              completeCallback: () => {
                switchControlAssist.close(processingFlag, 'Common::SaveButton');
              },
            });
          }
        }}
      />
    );
  }
}

export { SaveButton };
