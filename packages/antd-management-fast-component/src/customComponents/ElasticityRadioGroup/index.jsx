import { Radio } from 'antd';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

class ElasticityRadioGroup extends BaseComponent {
  renderFurther() {
    const {
      value,
      defaultValue,
      style,
      button,
      buttonStyle,
      list = [],
      dataConvert = null,
      renderItem,
      onChange,
    } = this.props;

    const listMerge = list.map((o) => {
      return { ...o, button: !!button };
    });

    const listAdjust =
      (dataConvert || null) == null
        ? listMerge
        : listMerge.map((o) => {
            return dataConvert(o);
          });

    const otherProperties = {
      ...(isFunction(renderItem)
        ? {}
        : {
            options: listAdjust,
          }),
    };

    return (
      <Radio.Group
        value={value || null}
        onChange={onChange || null}
        defaultValue={defaultValue || null}
        buttonStyle={buttonStyle || null}
        style={style || null}
        {...otherProperties}
      >
        {isFunction(renderItem)
          ? listAdjust.map((o, index) => {
              return renderItem(o, index);
            })
          : null}
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
  dataConvert: null,
  renderItem: null,
  onChange: null,
};

export { ElasticityRadioGroup };
