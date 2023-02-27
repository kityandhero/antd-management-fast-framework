import { Radio } from 'antd';
import React from 'react';

import {
  isFunction,
  logExecute,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';

class AmfRadioItem extends BaseComponent {
  renderFurther() {
    logExecute('renderFurther', 'AmfRadioItem');

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

AmfRadioItem.defaultProps = {
  button: false,
  list: [],
  adjustListDataCallback: null,
};

export { AmfRadioItem };
