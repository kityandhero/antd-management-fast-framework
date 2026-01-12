import { Col, Divider, Row, Space } from 'antd';
import React, { PureComponent } from 'react';

import { isArray, showSimpleRuntimeError } from 'easy-soft-utility';

class StatusBar extends PureComponent {
  render() {
    const { actions: actionsValue, extra } = this.props;

    let actionList = actionsValue || [];

    if (!isArray(actionList)) {
      const text = 'actions 必须为数组';

      showSimpleRuntimeError(text);

      actionList = [];
    }

    actionList = actionList.map((o, index) => {
      return { ...o, key: `status_bar_action_${index}` };
    });

    return (
      <Row>
        <Col
          flex="auto"
          style={{
            color: '#999',
          }}
        >
          <Space
            wrap
            separator={
              <Divider
                orientation="vertical"
                style={{
                  marginLeft: '0',
                  marginRight: '0',
                }}
              />
            }
          >
            {actionList.map((o) => o)}
          </Space>
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

export { StatusBar };
