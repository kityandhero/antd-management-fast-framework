import { ColorFactory } from 'antd/es/color-picker/color';

/**
 * convert option or radio data
 * @param {*} o data source
 * @param {*} index data index
 * @returns
 */
export function convertOptionOrRadioData(o, index) {
  const { flag, name, availability } = {
    flag: `option_${index}`,
    name: '',
    availability: 1,
    hidden: false,
    ...o,
  };

  return {
    index,
    label: name,
    value: flag,
    disabled: !availability,
    ...o,
  };
}

/**
 * convert option or radio data
 * @param {*} o data source
 * @param {*} index data index
 * @returns
 */
export function convertOptionOrRadioData1(o, index) {
  const { flag, name, availability } = {
    flag: `option_${index}`,
    name: '',
    availability: 1,
    hidden: false,
    ...o,
  };
  ColorFactory;
  return {
    index,
    label: name,
    value: flag,
    disabled: !availability,
    ...o,
  };
}
