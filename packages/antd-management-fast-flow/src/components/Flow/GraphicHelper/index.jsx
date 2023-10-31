import { Card } from 'antd';

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
              text: '点击 ”编辑“ 可设置节点信息。',
            },
            {
              text: '点击 ”更改“ 可设置节点审核人信息。',
            },
            {
              text: '点击 ”变更“ 可设置连线信息。',
            },
            {
              text: '点击 刷新图标 可重新加载信息。',
            },
            {
              text: '点击 删除图标 可删除节点或连线。',
            },
          ]}
          useBackground={false}
        />
      </div>
    </Card>
  );
}
