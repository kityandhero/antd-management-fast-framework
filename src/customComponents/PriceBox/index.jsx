import React, { PureComponent } from 'react';

import { formatMoney, isMoney } from '../../utils/tools';

class PriceBox extends PureComponent {
  render() {
    const {
      price,
      generalStyle,
      prefix,
      prefixStyle,
      integerPartStyle,
      pointStyle,
      decimalPartStyle,
    } = this.props;

    const commonStyle = {
      ...(generalStyle || {}),
      ...{
        verticalAlign: 'bottom',
      },
    };

    if (!isMoney(price)) {
      return '';
    }

    const money = formatMoney(price || 0, 2, '');

    const list = money.split('.');

    const integer = list[0];
    const decimal = list[1];

    return (
      <div
        style={{
          display: 'inline',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'flex-end',
            lineHeight: 1,
          }}
        >
          <div style={{ ...commonStyle, ...(prefixStyle || {}) }}>{prefix}</div>
          <div style={{ ...commonStyle, ...(integerPartStyle || {}) }}>{integer}</div>
          <div style={{ ...commonStyle, ...(pointStyle || {}) }}>.</div>
          <div style={{ ...commonStyle, ...(decimalPartStyle || {}) }}>{decimal}</div>
        </div>
      </div>
    );
  }
}

PriceBox.defaultProps = {
  price: 0,
  prefix: '',
  generalStyle: {},
  prefixStyle: {},
  integerPartStyle: {},
  pointStyle: {},
  decimalPartStyle: {},
};

export default PriceBox;
