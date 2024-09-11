import { whetherString, zeroString } from 'easy-soft-utility';

export const fontFamilyStyle = {
  fontFamily: 'fangsong',
};

export const colorDefault = '#000';

export const colorStyle = {
  color: colorDefault,
};

export const lineStyle = {};

export const documentTitleStyle = {
  fontSize: '30px',
};

export const labelFrontStyle = {
  fontSize: '20px',
  lineHeight: '36px',
};

export const valueFrontStyle = {
  fontSize: '20px',
  lineHeight: '36px',
};

export const highlightModeCollection = {
  none: 'none',
  label: 'label',
  value: 'value',
  all: 'all',
};

export const defaultConfig = {
  labelWidth: '160',
  width: zeroString,
  minHeight: '50',
  // height: 'auto',
  fullLine: whetherString.yes,
  currencyDisplay: whetherString.no,
  firstPosition: whetherString.no,
  enumList: [],
};

export const valueDisplayModeCollection = {
  text: 'text',
  enum: 'enum',
};
