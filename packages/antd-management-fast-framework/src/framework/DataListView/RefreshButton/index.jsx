import { Button, Tooltip } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { switchControlAssist } from '../../../utils/switchControlAssist';

@connect(({ switchControl }) => ({
  switchControl,
}))
class RefreshButton extends PureComponent {
  render() {
    const { switchControl, flag, title, onRefresh } = this.props;

    const refreshing = switchControlAssist.check(switchControl, flag);

    return (
      <Tooltip title={title}>
        <Button
          shape="circle"
          style={{
            color: '#000',
            border: 0,
          }}
          loading={refreshing}
          icon={iconBuilder.reload()}
          onClick={(event) => {
            if (isFunction(onRefresh)) {
              onRefresh(event);
            }
          }}
        />
      </Tooltip>
    );
  }
}

RefreshButton.defaultProps = {
  title: '刷新本页',
  onRefresh: null,
};

export { RefreshButton };
