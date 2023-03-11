import React, { Component } from 'react';

import { NumberInfo } from 'antd-management-fast-component';

import { Charts } from '../Charts';

import styles from './index.less';

const { MiniArea } = Charts;

function fixedZero(value) {
  return value * 1 < 10 ? `0${value}` : value;
}

function getActiveData() {
  const activeData = [];
  for (let index = 0; index < 24; index += 1) {
    activeData.push({
      x: `${fixedZero(index)}:00`,
      y: Math.floor(Math.random() * 200) + index * 50,
    });
  }
  return activeData;
}

class ActiveChart extends Component {
  state = {
    activeData: getActiveData(),
  };

  componentDidMount() {
    this.loopData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }

  loopData = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        this.setState(
          {
            activeData: getActiveData(),
          },
          () => {
            this.loopData();
          },
        );
      }, 1000);
    });
  };

  render() {
    const { activeData = [] } = this.state;

    return (
      <div className={styles.activeChart}>
        <NumberInfo subTitle="目标评估" total="有望达到预期" />
        <div style={{ marginTop: 32 }}>
          <MiniArea
            animate={false}
            line
            borderWidth={2}
            height={84}
            scale={{
              y: {
                tickCount: 3,
              },
            }}
            yAxis={{
              tickLine: false,
              label: false,
              title: false,
              line: false,
            }}
            data={activeData}
          />
        </div>
        {activeData && (
          <div>
            <div className={styles.activeChartGrid}>
              <p>
                {[...activeData].sort()[activeData.length - 1].y + 200} 亿元
              </p>
              <p>
                {[...activeData].sort()[Math.floor(activeData.length / 2)].y}{' '}
                亿元
              </p>
            </div>
            <div className={styles.dashedLine}>
              <div className={styles.line} />
            </div>
            <div className={styles.dashedLine}>
              <div className={styles.line} />
            </div>
          </div>
        )}
        {activeData && (
          <div className={styles.activeChartLegend}>
            <span>00:00</span>
            <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
            <span>{activeData[activeData.length - 1].x}</span>
          </div>
        )}
      </div>
    );
  }
}

export { ActiveChart };
