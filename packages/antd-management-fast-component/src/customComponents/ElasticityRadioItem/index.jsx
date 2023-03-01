import { Radio } from 'antd';
import React from 'react';

import { isFunction, toNumber, whetherNumber } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

class ElasticityRadioItem extends BaseComponent {
  renderFurther() {
    const { button, list, adjustListDataCallback } = this.props;

    let listData = list || [];

    if (isFunction(adjustListDataCallback)) {
      listData = adjustListDataCallback(listData);
    }

    const listRadio = [];

    if (listData.length <= 0) {
      return null;
    }

    for (const item of listData) {
      const { name, flag, availability } = {
        name: '',
        flag: '',
        availability: whetherNumber.yes,
        ...item,
      };

      const key = `${flag}_${name}`;

      const radio = button ? (
        <Radio.Button
          key={key}
          value={flag}
          disabled={toNumber(availability) !== whetherNumber.yes}
        >
          {name}
        </Radio.Button>
      ) : (
        <Radio
          key={key}
          value={flag}
          disabled={toNumber(availability) !== whetherNumber.yes}
        >
          {name}
        </Radio>
      );

      listRadio.push(radio);
    }

    return listRadio;
  }
}

ElasticityRadioItem.defaultProps = {
  button: false,
  list: [],
  adjustListDataCallback: null,
};

export { ElasticityRadioItem };
