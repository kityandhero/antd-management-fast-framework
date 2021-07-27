import { Axis, Chart, Interval, Tooltip } from 'bizcharts';
import React, { Component } from 'react';

import styles from '../index.less';

class Bar extends Component {
  state = {
    autoHideXLabels: false,
  };

  render() {
    const {
      title,
      autoFit = true,
      data,
      color = 'rgba(24, 144, 255, 0.85)',
      animate = true,
    } = this.props;
    const { autoHideXLabels } = this.state;
    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
        alias: title,
      },
    };

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    return (
      <div
        className={styles.chart}
        style={{
          height: '100%',
        }}
      >
        <div
          style={{
            height: '100%',
          }}
        >
          <Chart animate={animate} scale={scale} autoFit={autoFit} data={data}>
            <Axis
              name="x"
              title={false}
              label={autoHideXLabels ? undefined : {}}
              tickLine={autoHideXLabels ? undefined : {}}
            />
            <Axis title name="y" min={0} />
            <Tooltip showTitle={false} showCrosshairs={false} />
            <Interval position="x*y" color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Bar;
