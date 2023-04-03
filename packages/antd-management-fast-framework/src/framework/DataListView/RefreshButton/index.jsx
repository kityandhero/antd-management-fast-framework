import { Button, Tooltip } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { viewRefreshingFlag } from '../../../customConfig';

@connect(({ switchControl }) => ({
  switchControl,
}))
class RefreshButton extends PureComponent {
  render() {
    const { switchControl, title, onRefresh } = this.props;

    const refreshing = !!switchControl[viewRefreshingFlag];

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
