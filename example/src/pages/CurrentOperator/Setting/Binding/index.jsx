import React, { Component } from 'react';
import { List } from 'antd';
import {
  TaobaoOutlined,
  AlipayOutlined,
  DingdingOutlined,
} from '@ant-design/icons';

import { formatMessage } from '@/utils/tools';

class BindingView extends Component {
  getData = () => {
    return [
      {
        title: formatMessage({ id: 'app.settings.binding.taobao' }, {}),
        description: formatMessage(
          { id: 'app.settings.binding.taobao-description' },
          {},
        ),
        actions: [<a>{formatMessage({ id: 'app.settings.binding.bind' })}</a>],
        avatar: <TaobaoOutlined className="taobao" />,
      },
      {
        title: formatMessage({ id: 'app.settings.binding.alipay' }, {}),
        description: formatMessage(
          { id: 'app.settings.binding.alipay-description' },
          {},
        ),
        actions: [<a>{formatMessage({ id: 'app.settings.binding.bind' })}</a>],
        avatar: <AlipayOutlined className="alipay" />,
      },
      {
        title: formatMessage({ id: 'app.settings.binding.dingding' }, {}),
        description: formatMessage(
          { id: 'app.settings.binding.dingding-description' },
          {},
        ),
        actions: [<a>{formatMessage({ id: 'app.settings.binding.bind' })}</a>],
        avatar: <DingdingOutlined className="dingding" />,
      },
    ];
  };

  render() {
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default BindingView;
