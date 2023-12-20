import { Card } from 'antd';
import React from 'react';

import { HelpBox } from 'antd-management-fast-component';

export function GraphicHelper() {
  return (
    <Card title="操作说明：" size="small">
      <div style={{ width: '180px' }}>
        <HelpBox
          showTitle={false}
          showNumber
          labelWidth={18}
          list={[
            {
              text: '起始节点仅能存在一个。',
            },
            {
              text: '点击节点中的 ”编辑“ 可设置节点信息。',
            },
            {
              text: '点击节点中的 ”更改“ 可设置节点审核人信息。',
            },
            {
              text: '点击节点中的 ”条件“ 可设置节点的分支进入条件, 仅在存在多条驶出线条时可用。',
            },
            {
              text: '点击线条中的 ”变更“ 可设置连线信息。',
            },
            {
              text: '点击 刷新图标 可重新加载信息。',
            },
            {
              text: '点击节点或线条的 删除图标 可删除节点或连线。',
            },
          ]}
          useBackground={false}
        />
      </div>
    </Card>
  );
}
