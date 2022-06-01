import { Card } from 'antd';
import { G6, withEditorContext } from 'gg-editor';
import React from 'react';

class MiniMap extends React.Component {
  componentDidMount() {
    const { graph } = this.props;
    if (graph) {
      graph.addPlugin(
        new G6.Minimap({
          container: document.getElementById('minimapContainer'),
          size: [196, 200], // 需设置宽高
        }),
      );
      /** 手动调用 paint 方法用于刷新页面，解决添加插件后 viewport 的边框未正确渲染的 bug */
      graph.paint();
    }
  }

  render() {
    return (
      <Card type="inner" size="small" title="Minimap" bordered={false}>
        <div id="minimapContainer" className={this.props.className} />
      </Card>
    );
  }
}

export default withEditorContext(MiniMap);
