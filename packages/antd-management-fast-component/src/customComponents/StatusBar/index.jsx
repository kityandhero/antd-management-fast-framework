import { Col, Divider, Row } from 'antd';
import React, { PureComponent } from 'react';

import {
  isArray,
  showRuntimeError,
} from 'antd-management-fast-common/es/utils/tools';

class StatusBar extends PureComponent {
  render() {
    const { actions: actionsValue, extra } = this.props;

    let actionList = actionsValue || [];

    if (!isArray(actionList)) {
      const text = 'actions 必须为数组';

      showRuntimeError({
        message: text,
      });

      actionList = [];
    }

    const actionCount = actionList.length;

    actionList = actionList.map((o, index) => {
      return { ...o, ...{ key: `status_bar_action_${index}` } };
    });

    return (
      <Row>
        <Col
          flex="auto"
          style={{
            color: '#999',
          }}
        >
          {actionList.map((o, index) => {
            if (index !== actionCount - 1) {
              return (
                <div
                  key={o.key}
                  style={{
                    display: 'inline-block',
                  }}
                >
                  {o}
                  <Divider type="vertical" />
                </div>
              );
            }

            return (
              <div
                key={o.key}
                style={{
                  display: 'inline-block',
                }}
              >
                {o}
              </div>
            );
          })}
        </Col>
        {extra == null ? null : <Col flex>{extra}</Col>}
      </Row>
    );
  }
}

StatusBar.defaultProps = {
  actions: [],
  extra: null,
};

export default StatusBar;
