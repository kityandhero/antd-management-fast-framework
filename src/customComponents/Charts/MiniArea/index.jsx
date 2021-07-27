import { Axis, Chart, Area, Line, Tooltip } from 'bizcharts';
import React from 'react';
import styles from '../index.less';

const MiniArea = (props) => {
  const {
    data = [],
    autoFit = true,
    color = 'rgba(24, 144, 255, 0.2)',
    borderColor = '#1089ff',
    scale = {
      x: {},
      y: {},
    },
    line,
    xAxis,
    yAxis,
    animate = true,
    pure = true,
  } = props;

  const scaleProps = {
    x: {
      type: 'cat',
      range: [0, 1],
      ...scale.x,
    },
    y: {
      min: 0,
      ...scale.y,
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
        <Chart animate={animate} scale={scaleProps} autoFit={autoFit} data={data} pure={pure}>
          <Axis
            key="axis-x"
            name="x"
            label={null}
            line={null}
            tickLine={null}
            grid={null}
            {...xAxis}
          />
          <Axis
            key="axis-y"
            name="y"
            label={null}
            line={null}
            tickLine={null}
            grid={null}
            {...yAxis}
          />
          <Tooltip showTitle={false} showCrosshairs={false} />

          {line ? (
            <Line
              position="x*y"
              tooltip={tooltip}
              color={borderColor}
              shape="smooth"
              style={{
                fillOpacity: 1,
              }}
            />
          ) : (
            <Area
              position="x*y"
              color={color}
              tooltip={tooltip}
              shape="smooth"
              style={{
                fillOpacity: 1,
              }}
            />
          )}
        </Chart>
      </div>
    </div>
  );
};

export default MiniArea;
