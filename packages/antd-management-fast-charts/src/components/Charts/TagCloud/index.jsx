import bizcharts, { Chart, Coordinate, Geom, Tooltip } from 'bizcharts';
import classNames from 'classnames';
import Debounce from 'lodash.debounce';
import React, { Component } from 'react';
import DataSet from '@antv/data-set';

import { stringifyJson } from 'easy-soft-utility';

import { AutoHeightComponent } from '../autoHeight';

import styles from './index.less';

const registerShape = bizcharts.registerShape;

const imgUrl =
  'https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png';

function getTextAttributes(cfg) {
  return {
    ...cfg.style,
    fillOpacity: cfg.opacity,
    fontSize: cfg.origin._origin.size,
    rotate: cfg.origin._origin.rotate,
    text: cfg.origin._origin.text,
    textAlign: 'center',
    fontFamily: cfg.origin._origin.font,
    fill: cfg.color,
    textBaseline: 'Alphabetic',
  };
}

class TagCloud extends Component {
  state = {
    dv: null,
    height: 0,
    width: 0,
  };

  isUnmount = false;

  requestRef = 0;

  root = undefined;

  imageMask = undefined;

  componentDidMount() {
    requestAnimationFrame(() => {
      this.initTagCloud();
      this.renderChart(this.props);
    });
    window.addEventListener('resize', this.resize, {
      passive: true,
    });
  }

  componentDidUpdate(preProperties) {
    const { data } = this.props;

    if (
      preProperties &&
      stringifyJson(preProperties.data) !== stringifyJson(data)
    ) {
      this.renderChart(this.props);
    }
  }

  componentWillUnmount() {
    this.isUnmount = true;
    window.cancelAnimationFrame(this.requestRef);
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.renderChart(this.props);
    });
  };

  saveRootRef = (node) => {
    this.root = node;
  };

  initTagCloud = () => {
    registerShape('point', 'cloud', {
      draw(cfg, container) {
        const attributes = getTextAttributes(cfg);
        return container.addShape('text', {
          attrs: { ...attributes, x: cfg.x, y: cfg.y },
        });
      },
    });
  };

  renderChart = Debounce((nextProperties) => {
    // const colors = ['#1890FF', '#41D9C7', '#2FC25B', '#FACC14', '#9AE65C'];
    const { data, height } = nextProperties || this.props;

    if (data.length === 0 || !this.root) {
      return;
    }

    const h = height;
    const w = this.root.offsetWidth;

    const onload = () => {
      const dv = new DataSet.View().source(data);
      const range = dv.range('value');
      const [min, max] = range;
      dv.transform({
        type: 'tag-cloud',
        fields: ['name', 'value'],
        imageMask: this.imageMask,
        font: 'Verdana',
        size: [w, h],
        // 宽高设置最好根据 imageMask 做调整
        padding: 0,
        timeInterval: 5000,

        // max execute time
        rotate() {
          return 0;
        },

        fontSize(d) {
          const size = ((d.value - min) / (max - min)) ** 2;
          return size * (17.5 - 5) + 5;
        },
      });

      if (this.isUnmount) {
        return;
      }

      this.setState({
        dv,
        width: w,
        height: h,
      });
    };

    if (this.imageMask) {
      onload();
    } else {
      this.imageMask = new Image();
      this.imageMask.crossOrigin = '';
      this.imageMask.src = imgUrl;
      this.imageMask.addEventListener('load', onload);
    }
  }, 500);

  render() {
    const { className } = this.props;
    const { dv, width, height: stateHeight } = this.state;
    return (
      <AutoHeightComponent>
        <div
          className={classNames(styles.tagCloud, className)}
          style={{
            width: '100%',
            height: `100%`,
          }}
          ref={this.saveRootRef}
        >
          {dv && (
            <Chart
              width={width}
              height={stateHeight}
              data={dv}
              padding={0}
              scale={{
                x: {
                  nice: false,
                },
                y: {
                  nice: false,
                },
              }}
            >
              <Tooltip showTitle={false} />
              <Coordinate reflect="y" />
              <Geom
                type="point"
                position="x*y"
                color="text"
                shape="cloud"
                tooltip={[
                  'text*value',
                  function trans(text, value) {
                    return {
                      name: text,
                      value,
                    };
                  },
                ]}
              />
            </Chart>
          )}
        </div>
      </AutoHeightComponent>
    );
  }
}

export { TagCloud };
