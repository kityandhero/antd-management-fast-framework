import { Col, Divider, Row } from 'antd';
import {
  Axis,
  Chart,
  Coordinate,
  Interaction,
  Interval,
  registerShape,
  Tooltip,
} from 'bizcharts';
import classNames from 'classnames';
import React, { Component } from 'react';

import styles from './index.less';

const sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

registerShape('interval', 'sliceShape', {
  draw(cfg, container) {
    const { points } = cfg;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y - sliceNumber]);
    path.push(['L', points[2].x, points[2].y - sliceNumber]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path,
      },
    });
  },
});

class Pie extends Component {
  state = {};

  calculateTotal = (d) => {
    let result = 0;

    (d || []).map((o) => {
      result += o.y;

      return o;
    });

    return result;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleLegendClick = (item, i) => {};

  render() {
    const { valueFormat, subTitle, total, className, style } = this.props;
    const pieClassName = classNames(styles.pie, className, styles.legendBlock);
    const { data: propsData } = this.props;

    const totalValue = this.calculateTotal(propsData);

    return (
      <div className={pieClassName}>
        <Row gutter={24}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div className={styles.chart} style={style}>
              <Chart data={propsData || []} autoFit>
                <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
                <Axis visible={false} />
                <Tooltip showTitle={false} />
                <Interval
                  adjust="stack"
                  position="y"
                  color="x"
                  shape="sliceShape"
                />
                <Interaction type="element-single-selected" />
              </Chart>
            </div>

            {(subTitle || total) && (
              <div className={styles.total}>
                {subTitle && <h4 className="pie-sub-title">{subTitle}</h4>}
                {total && (
                  <div className="pie-stat">
                    {typeof total === 'function' ? total() : total}
                  </div>
                )}
              </div>
            )}
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ul className={styles.legend} style={style}>
              {(propsData || []).map((item, i) => {
                const key = `${item.x}_${i}`;

                return (
                  <li key={key} onClick={() => this.handleLegendClick(item, i)}>
                    <span
                      className={styles.dot}
                      style={{
                        backgroundColor: !item.checked ? '#aaa' : item.color,
                      }}
                    />
                    <span className={styles.legendTitle}>{item.x}</span>
                    <Divider type="vertical" />
                    <span className={styles.percent}>
                      {`${((totalValue || 0) > 0
                        ? (Number.isNaN(item.y / totalValue)
                            ? 0
                            : item.y / totalValue) * 100
                        : 0
                      ).toFixed(2)}%`}
                    </span>
                    <span className={styles.value}>
                      {valueFormat ? valueFormat(item.y) : item.y}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

export { Pie };
