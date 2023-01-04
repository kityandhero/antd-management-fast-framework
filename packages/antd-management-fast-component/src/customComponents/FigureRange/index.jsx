import { Col, Input, Row, Select } from 'antd';
import React, { PureComponent } from 'react';

import {
  isFunction,
  toNumber,
} from 'antd-management-fast-common/es/utils/tools';

import styles from './index.less';

const { Option } = Select;

export const figureRangeType = {
  unlimited: {
    flag: -10000,
    text: '不限',
  },
  zero: {
    flag: 0,
    text: '零',
  },
  eq: {
    flag: 10,
    text: '等于',
  },
  gt: {
    flag: 20,
    text: '大于',
  },
  gte: {
    flag: 21,
    text: '大于等于',
  },
  le: {
    flag: 30,
    text: '小于',
  },
  lte: {
    flag: 31,
    text: '小于等于',
  },
  between: {
    flag: 40,
    text: '范围之内',
  },
  except: {
    flag: 50,
    text: '范围之外',
  },
};

class FigureRange extends PureComponent {
  rangeType = figureRangeType;

  constructor(props) {
    super(props);

    this.state = {
      type: figureRangeType.unlimited.flag,
      min: null,
      max: null,
      value: null,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      type: typeData,
      min: minData,
      max: maxData,
      value: valueData,
    } = nextProps;

    const type = toNumber(typeData);
    const min = toNumber(minData);
    const max = toNumber(maxData);
    const value = toNumber(valueData);

    if (
      !(
        type === figureRangeType.unlimited.flag ||
        type === figureRangeType.zero.flag ||
        type === figureRangeType.eq.flag ||
        type === figureRangeType.gt.flag ||
        type === figureRangeType.gte.flag ||
        type === figureRangeType.le.flag ||
        type === figureRangeType.lte.flag ||
        type === figureRangeType.between.flag ||
        type === figureRangeType.except.flag
      )
    ) {
      return {
        type: figureRangeType.unlimited.flag,
        min: null,
        max: null,
        value: null,
      };
    }

    return { type, min, max, value };
  }

  onDataChange = (type, min, max, value) => {
    const { onChange } = this.props;

    if (isFunction(onChange)) {
      onChange(toNumber(type), toNumber(min), toNumber(max), toNumber(value));
    }
  };

  onTypeChange = (v) => {
    const { min, max, value } = this.state;

    const d = toNumber(v);

    this.setState({ type: d });

    this.onDataChange(d, min, max, value);
  };

  onValueChange = (e) => {
    const { type, min, max } = this.state;
    const { value: v } = e.target;

    const d = toNumber(v);

    this.setState({ value: d });

    this.onDataChange(type, min, max, d);
  };

  onMinChange = (e) => {
    const { type, max, value } = this.state;
    const { value: v } = e.target;

    const d = toNumber(v);

    this.setState({ min: toNumber(v) });

    this.onDataChange(type, d, max, value);
  };

  onMaxChange = (e) => {
    const { type, min, value } = this.state;
    const { value: v } = e.target;

    const d = toNumber(v);

    this.setState({ max: d });

    this.onDataChange(type, min, d, value);
  };

  render() {
    const { minText, maxText, splitText, valueText } = this.props;
    const { type, min, max, value } = this.state;

    return (
      <Input.Group compact className={styles.figureRange}>
        <Row wrap={false} style={{ display: 'flex' }}>
          <Col
            flex={
              type === figureRangeType.unlimited.flag ||
              type === figureRangeType.zero.flag
                ? 'auto'
                : '100px'
            }
          >
            <Select
              className={
                type !== figureRangeType.unlimited.flag &&
                type !== figureRangeType.zero.flag
                  ? styles.select
                  : null
              }
              style={{ width: '100%' }}
              defaultValue={`${type}`}
              value={`${type}`}
              onChange={(e) => {
                this.onTypeChange(e);
              }}
            >
              <Option value={`${figureRangeType.unlimited.flag}`}>
                {figureRangeType.unlimited.text}
              </Option>
              <Option value={`${figureRangeType.zero.flag}`}>
                {figureRangeType.zero.text}
              </Option>
              <Option value={`${figureRangeType.eq.flag}`}>
                {figureRangeType.eq.text}
              </Option>
              <Option value={`${figureRangeType.gt.flag}`}>
                {figureRangeType.gt.text}
              </Option>
              <Option value={`${figureRangeType.gte.flag}`}>
                {figureRangeType.gte.text}
              </Option>
              <Option value={`${figureRangeType.le.flag}`}>
                {figureRangeType.le.text}
              </Option>
              <Option value={`${figureRangeType.lte.flag}`}>
                {figureRangeType.lte.text}
              </Option>
              <Option value={`${figureRangeType.between.flag}`}>
                {figureRangeType.between.text}
              </Option>
              <Option value={`${figureRangeType.except.flag}`}>
                {figureRangeType.except.text}
              </Option>
            </Select>
          </Col>

          {type !== figureRangeType.unlimited.flag &&
          type !== figureRangeType.zero.flag ? (
            <Col flex="auto">
              {type === figureRangeType.eq.flag ||
              type === figureRangeType.gt.flag ||
              type === figureRangeType.gte.flag ||
              type === figureRangeType.le.flag ||
              type === figureRangeType.lte.flag ? (
                <Input
                  className={styles.valueInput}
                  value={value}
                  placeholder={valueText}
                  onChange={(v) => {
                    this.onValueChange(v);
                  }}
                />
              ) : null}

              {type === figureRangeType.between.flag ||
              type === figureRangeType.except.flag ? (
                <Row wrap={false}>
                  <Col flex="0 1 auto">
                    <Input
                      style={{ textAlign: 'center' }}
                      className={styles.minInput}
                      placeholder={minText}
                      value={min}
                      onChange={(v) => {
                        this.onMinChange(v);
                      }}
                    />
                  </Col>
                  <Col flex="1 1 30px">
                    <Input
                      className={styles.inputSplit}
                      style={{
                        textAlign: 'center',
                        borderLeft: 0,
                        borderRight: 0,
                        pointerEvents: 'none',
                      }}
                      placeholder={splitText}
                      disabled
                    />
                  </Col>
                  <Col flex="0 1 auto">
                    <Input
                      className={styles.maxInput}
                      style={{
                        textAlign: 'center',
                      }}
                      placeholder={maxText}
                      value={max}
                      onChange={(v) => {
                        this.onMaxChange(v);
                      }}
                    />
                  </Col>
                </Row>
              ) : null}
            </Col>
          ) : null}
        </Row>
      </Input.Group>
    );
  }
}

FigureRange.defaultProps = {
  minText: '最小值',
  maxText: '最大值',
  valueText: '请输入',
  splitText: '~',
  type: figureRangeType.unlimited.flag,
  min: null,
  max: null,
  value: null,
};

export default FigureRange;
