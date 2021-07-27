import { Chart, Interval, Tooltip } from 'bizcharts';
import React from 'react';
import styles from '../index.less';

const MiniBar = (props) => {
  const { autoFit = true, color = '#1890FF', data = [], animate = true, pure = true } = props;

  const scale = {
    x: {
      type: 'cat',
    },
    y: {
      min: 0,
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
    <div className={styles.miniChart}>
      <div className={styles.chartContent}>
        <Chart animate={animate} scale={scale} autoFit={autoFit} data={data} pure={pure}>
          <Tooltip showTitle={false} showCrosshairs={false} />
          <Interval position="x*y" color={color} tooltip={tooltip} />
        </Chart>
      </div>
    </div>
  );
};

export default MiniBar;
