import React, { Component } from 'react';
import { List } from 'antd';

import { formatMessage } from '@/utils/tools';

const passwordStrength = {
  strong: <font className="strong">{formatMessage({ id: 'app.settings.security.strong' })}</font>,
  medium: <font className="medium">{formatMessage({ id: 'app.settings.security.medium' })}</font>,
  weak: (
    <font className="weak">
      {formatMessage({ id: 'app.settings.security.weak' })}
      Weak
    </font>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage({ id: 'app.settings.security.password' }, {}),
      description: (
        <>
          {formatMessage({ id: 'app.settings.security.password-description' })}：
          {passwordStrength.strong}
        </>
      ),
      actions: [<a>{formatMessage({ id: 'app.settings.security.modify' })}</a>],
    },
    {
      title: formatMessage({ id: 'app.settings.security.phone' }, {}),
      description: `${formatMessage(
        { id: 'app.settings.security.phone-description' },
        {},
      )}：138****8293`,
      actions: [<a>{formatMessage({ id: 'app.settings.security.modify' })}</a>],
    },
    {
      title: formatMessage({ id: 'app.settings.security.question' }, {}),
      description: formatMessage({ id: 'app.settings.security.question-description' }, {}),
      actions: [<a>{formatMessage({ id: 'app.settings.security.set' })}</a>],
    },
    {
      title: formatMessage({ id: 'app.settings.security.email' }, {}),
      description: `${formatMessage(
        { id: 'app.settings.security.email-description' },
        {},
      )}：ant***sign.com`,
      actions: [<a>{formatMessage({ id: 'app.settings.security.modify' })}</a>],
    },
    {
      title: formatMessage({ id: 'app.settings.security.mfa' }, {}),
      description: formatMessage({ id: 'app.settings.security.mfa-description' }, {}),
      actions: [<a>{formatMessage({ id: 'app.settings.security.bind' })}</a>],
    },
  ];

  render() {
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default SecurityView;
