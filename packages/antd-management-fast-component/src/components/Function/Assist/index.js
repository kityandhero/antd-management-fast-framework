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
    availability: 0,
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
