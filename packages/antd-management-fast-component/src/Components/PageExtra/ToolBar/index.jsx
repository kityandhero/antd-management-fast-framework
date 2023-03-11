import { Affix, Card, Divider, Space, Tooltip } from 'antd';
import React from 'react';

import {
  isArray,
  isBoolean,
  isEmptyArray,
  logObject,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { BaseComponent } from '../../../BasicComponents';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';

class ToolBar extends BaseComponent {
  renderFurther() {
    const { stick, title, tools } = this.props;

    if (!isArray(tools)) {
      const text = '工具栏配置数据无效';

      showSimpleErrorMessage(text);

      logObject(config);

      return null;
    }

    if (isEmptyArray(tools)) {
      return null;
    }

    const toolList = tools.map((o, index) => {
      return { ...o, key: `toolItem_${index}` };
    });

    const bar = (
      <Card
        title={<IconInfo icon={iconBuilder.tool()} text={title || '工具栏'} />}
        bordered={false}
        bodyStyle={{ padding: 0 }}
        extra={
          <Space split={<Divider type="vertical" />}>
            {toolList.map((o) => {
              const { hidden } = { hidden: false, ...o };

              if (hidden) {
                return null;
              }

              return (
                <Tooltip key={o.key} title={o.title || ''}>
                  {o.component}
                </Tooltip>
              );
            })}
          </Space>
        }
      />
    );

    if (isBoolean(stick) && stick) {
      return <Affix offsetTop={0}>{bar}</Affix>;
    }

    return bar;
  }
}

ToolBar.defaultProps = {
  stick: false,
  title: '工具栏',
  tools: [],
};

export { ToolBar };
