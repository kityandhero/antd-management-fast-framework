import { Radio } from 'antd';
import React from 'react';

import { logExecute } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';

class AmfRadioGroup extends BaseComponent {
  renderFurther() {
    logExecute('renderFurther', 'AmfRadioGroup');

    const {
      value,
      defaultValue,
      style,
      button,
      buttonStyle,
      list,
      adjustListDataCallback,
      onChange,
    } = this.props;

    return (
      <Radio.Group
        value={value || null}
        onChange={onChange || null}
        defaultValue={defaultValue || null}
        buttonStyle={buttonStyle || null}
        style={style || null}
      >
        <AmfRadioGroup
          button={button}
          list={list}
          adjustListDataCallback={adjustListDataCallback}
        />
      </Radio.Group>
    );
  }
}

AmfRadioGroup.defaultProps = {
  value: null,
  defaultValue: null,
  style: null,
  button: false,
  buttonStyle: null,
  list: [],
  adjustListDataCallback: null,
  onChange: null,
};

export { AmfRadioGroup };
