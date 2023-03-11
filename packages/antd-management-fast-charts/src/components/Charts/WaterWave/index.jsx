import React, { Component } from 'react';

import { AutoHeightComponent } from '../autoHeight';

import styles from './index.less';

/* eslint no-return-assign: 0 */

/* eslint no-mixed-operators: 0 */
// riddle: https://riddle.alibaba-inc.com/riddles/2d9a4b90

class WaterWave extends Component {
  state = {
    radio: 1,
  };

  timer = 0;

  root = null;

  node = null;

  componentDidMount() {
    this.renderChart();
    this.resize();
    window.addEventListener(
      'resize',
      () => {
        requestAnimationFrame(() => this.resize());
      },
      {
        passive: true,
      },
    );
  }

  componentDidUpdate(properties) {
    const { percent } = this.props;

    if (properties.percent !== percent) {
      // 不加这个会造成绘制缓慢
      this.renderChart('update');
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.timer);

    if (this.node) {
      this.node.innerHTML = '';
    }

    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    if (this.root) {
      const { height = 1 } = this.props;
      const { offsetWidth } = this.root.parentNode;
      this.setState({
        radio: offsetWidth < height ? offsetWidth / height : 1,
      });
    }
  };

  renderChart(type) {
    const { percent, color = '#1890FF' } = this.props;
    const data = percent / 100;
    const self = this;
    cancelAnimationFrame(this.timer);

    if (!this.node || (data !== 0 && !data)) {
      return;
    }

    const canvas = this.node;
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const radius = canvasWidth / 2;
    const lineWidth = 2;
    const cR = radius - lineWidth;
    context.beginPath();
    context.lineWidth = lineWidth * 2;
    const axisLength = canvasWidth - lineWidth;
    const unit = axisLength / 8;
    const range = 0.2; // 振幅

    let currentRange = range;
    const xOffset = lineWidth;
    let sp = 0; // 周期偏移量

    let currentData = 0;
    const waveupsp = 0.005; // 水波上涨速度

    let arcStack = [];
    const bR = radius - lineWidth;
    const circleOffset = -(Math.PI / 2);
    let circleLock = true;

    for (
      let index = circleOffset;
      index < circleOffset + 2 * Math.PI;
      index += 1 / (8 * Math.PI)
    ) {
      arcStack.push([
        radius + bR * Math.cos(index),
        radius + bR * Math.sin(index),
      ]);
    }

    const cStartPoint = arcStack.shift();
    context.strokeStyle = color;
    context.moveTo(cStartPoint[0], cStartPoint[1]);

    function drawSin() {
      if (!context) {
        return;
      }

      context.beginPath();
      context.save();
      const sinStack = [];

      for (
        let index = xOffset;
        index <= xOffset + axisLength;
        index += 20 / axisLength
      ) {
        const x = sp + (xOffset + index) / unit;
        const y = Math.sin(x) * currentRange;
        const dx = index;
        const dy = 2 * cR * (1 - currentData) + (radius - cR) - unit * y;
        context.lineTo(dx, dy);
        sinStack.push([dx, dy]);
      }

      const startPoint = sinStack.shift();
      context.lineTo(xOffset + axisLength, canvasHeight);
      context.lineTo(xOffset, canvasHeight);
      context.lineTo(startPoint[0], startPoint[1]);
      const gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, color);
      context.fillStyle = gradient;
      context.fill();
      context.restore();
    }

    function render() {
      if (!context) {
        return;
      }

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      if (circleLock && type !== 'update') {
        if (arcStack.length > 0) {
          const temporary = arcStack.shift();
          context.lineTo(temporary[0], temporary[1]);
          context.stroke();
        } else {
          circleLock = false;
          context.lineTo(cStartPoint[0], cStartPoint[1]);
          context.stroke();
          arcStack = [];
          context.globalCompositeOperation = 'destination-over';
          context.beginPath();
          context.lineWidth = lineWidth;
          context.arc(radius, radius, bR, 0, 2 * Math.PI, true);
          context.beginPath();
          context.save();
          context.arc(
            radius,
            radius,
            radius - 3 * lineWidth,
            0,
            2 * Math.PI,
            true,
          );
          context.restore();
          context.clip();
          context.fillStyle = color;
        }
      } else {
        if (data >= 0.85) {
          if (currentRange > range / 4) {
            const t = range * 0.01;
            currentRange -= t;
          }
        } else if (data <= 0.1) {
          if (currentRange < range * 1.5) {
            const t = range * 0.01;
            currentRange += t;
          }
        } else {
          if (currentRange <= range) {
            const t = range * 0.01;
            currentRange += t;
          }

          if (currentRange >= range) {
            const t = range * 0.01;
            currentRange -= t;
          }
        }

        if (data - currentData > 0) {
          currentData += waveupsp;
        }

        if (data - currentData < 0) {
          currentData -= waveupsp;
        }

        sp += 0.07;
        drawSin();
      }

      self.timer = requestAnimationFrame(render);
    }

    render();
  }

  render() {
    const { radio } = this.state;
    const { percent, title, height = 1 } = this.props;
    return (
      <AutoHeightComponent>
        <div
          className={styles.waterWave}
          ref={(n) => (this.root = n)}
          style={{
            transform: `scale(${radio})`,
            height: `100%`,
          }}
        >
          <div
            style={{
              width: height,
              height,
              overflow: 'hidden',
            }}
          >
            <canvas
              className={styles.waterWaveCanvasWrapper}
              ref={(n) => (this.node = n)}
              width={height * 2}
              height={height * 2}
            />
          </div>
          <div
            className={styles.text}
            style={{
              width: height,
            }}
          >
            {title && <span>{title}</span>}
            <h4>{percent}%</h4>
          </div>
        </div>
      </AutoHeightComponent>
    );
  }
}

export { WaterWave };
