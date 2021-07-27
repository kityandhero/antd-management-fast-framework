import React, { PureComponent } from 'react';

import { stringIsNullOrWhiteSpace, copyToClipboard, getRandomColor, isNumber } from '@/utils/tools';

class ColorText extends PureComponent {
  copyText = () => {
    const { canCopy, text } = this.props;

    if (canCopy && !stringIsNullOrWhiteSpace(text)) {
      copyToClipboard(text);
    }
  };

  render() {
    const { textPrefix, randomSeed, seedOffset, randomColor, color, text, canCopy } = this.props;

    let colorValue = color || '';

    const randomColorValue = randomColor || false;

    if (randomColorValue) {
      colorValue = getRandomColor(randomSeed + (isNumber(seedOffset) ? Math.abs(seedOffset) : 0));
    }

    const style = {
      ...{ color: 'rgba(0, 0, 0, 0.85)' },
      ...(canCopy ? { cursor: 'pointer' } : {}),
    };

    const textStyle = {
      ...(!stringIsNullOrWhiteSpace(colorValue) ? { color: colorValue } : {}),
    };

    return (
      <span
        style={style}
        onClick={() => {
          this.copyText();
        }}
      >
        {stringIsNullOrWhiteSpace(textPrefix) ? '' : `${textPrefix}：`}
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
  text: '',
};

export default ColorText;
