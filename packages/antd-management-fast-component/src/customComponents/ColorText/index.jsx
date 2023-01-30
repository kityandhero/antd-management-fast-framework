import React, { PureComponent } from 'react';

import {
  copyToClipboard,
  getRandomColor,
  isNumber,
} from 'antd-management-fast-common/es/utils/tools';

class ColorText extends PureComponent {
  copyText = () => {
    const { canCopy, text } = this.props;

    if (canCopy && !checkStringIsNullOrWhiteSpace(text)) {
      copyToClipboard(text);
    }
  };

  render() {
    const {
      textPrefix,
      textPrefixStyle,
      randomSeed,
      seedOffset,
      randomColor,
      color,
      text,
      canCopy,
      separator,
      separatorStyle,
    } = this.props;

    let colorValue = color || '';

    const randomColorValue = randomColor || false;

    if (randomColorValue) {
      colorValue = getRandomColor({
        seed: randomSeed + (isNumber(seedOffset) ? Math.abs(seedOffset) : 0),
      });
    }

    const style = {
      ...{ color: 'rgba(0, 0, 0, 0.85)' },
      ...(canCopy ? { cursor: 'pointer' } : {}),
    };

    const textStyle = {
      ...(!checkStringIsNullOrWhiteSpace(colorValue)
        ? { color: colorValue }
        : {}),
    };

    return (
      <span
        style={style}
        onClick={() => {
          this.copyText();
        }}
      >
        {checkStringIsNullOrWhiteSpace(textPrefix) ? (
          ''
        ) : (
          <>
            <span style={textPrefixStyle || null}>{textPrefix}</span>
            {checkStringIsNullOrWhiteSpace(separator) ? null : (
              <span style={separatorStyle || null}>{separator}</span>
            )}
          </>
        )}
        <span style={textStyle}>{text}</span>
      </span>
    );
  }
}

ColorText.defaultProps = {
  canCopy: false,
  randomSeed: 0,
  seedOffset: 0,
  randomColor: false,
  color: '',
  textPrefix: null,
  textPrefixStyle: null,
  text: '',
  separator: '：',
  separatorStyle: null,
};

export default ColorText;
