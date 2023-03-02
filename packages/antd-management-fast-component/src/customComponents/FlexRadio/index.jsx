import React from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { ColorText } from '../ColorText';
import { ElasticityRadioGroup } from '../ElasticityRadioGroup';
import { FlexBox } from '../FlexBox';
import { VerticalBox } from '../VerticalBox';

class FlexRadio extends BaseComponent {
  renderFurther() {
    const {
      label = '',
      separator = ':',
      value,
      defaultValue,
      style,
      button,
      buttonStyle,
      size = 'middle',
      list = [],
      dataConvert = null,
      renderItem,
      onChange: onChangeCallback = null,
    } = this.props;

    const radioProperties = {
      value,
      defaultValue,
      style,
      button,
      buttonStyle,
      size,
      list,
      dataConvert,
      renderItem,
      onChange: onChangeCallback,
    };

    if (checkStringIsNullOrWhiteSpace(label)) {
      return <ElasticityRadioGroup {...radioProperties} />;
    }

    return (
      <FlexBox
        flexAuto="right"
        left={
          checkStringIsNullOrWhiteSpace(label || '') ? null : (
            <VerticalBox
              align="center"
              alignJustify="start"
              style={{
                height: '100%',
              }}
            >
              <ColorText
                textPrefix={label}
                separator={separator}
                separatorStyle={{ paddingLeft: '4px', paddingRight: '8px' }}
              />
            </VerticalBox>
          )
        }
        right={<ElasticityRadioGroup {...radioProperties} />}
      />
    );
  }
}

FlexRadio.defaultProps = {
  label: '',
  separator: ':',
  value: null,
  defaultValue: null,
  style: null,
  button: false,
  size: 'middle',
  buttonStyle: null,
  list: [],
  dataConvert: null,
  renderItem: null,
  onChange: null,
};

export { FlexRadio };
