import { Radio } from 'antd';
import React from 'react';

import { BaseComponent } from '../BaseComponent';
import { ElasticityRadioItem } from '../ElasticityRadioItem';

class ElasticityRadioGroup extends BaseComponent {
  renderFurther() {
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
        <ElasticityRadioItem
          button={button}
          list={list}
          adjustListDataCallback={adjustListDataCallback}
        />
      </Radio.Group>
    );
  }
}

ElasticityRadioGroup.defaultProps = {
  value: null,
  defaultValue: null,
  style: null,
  button: false,
  buttonStyle: null,
  list: [],
  adjustListDataCallback: null,
  onChange: null,
};

export { ElasticityRadioGroup };
