import React, { PureComponent } from 'react';

import { checkStringIsNullOrWhiteSpace, isNumber } from 'easy-soft-utility';

import {
  buildRandomHexColor,
  copyToClipboard,
} from 'antd-management-fast-common';

class ColorText extends PureComponent {
  copyText = () => {
    const { canCopy, text } = this.props;

    if (canCopy && !checkStringIsNullOrWhiteSpace(text)) {
      copyToClipboard(text);
    }
  };

  render() {
    const {
      style,
      textStyle,
      block,
      multiLine,
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
      colorValue = buildRandomHexColor({
        seed: randomSeed + (isNumber(seedOffset) ? Math.abs(seedOffset) : 0),
      });
    }

    const styleAdjust = {
      ...style,
      color: 'rgba(0, 0, 0, 0.85)',
      ...(canCopy ? { cursor: 'pointer' } : {}),
      ...(block
        ? {
            display: 'block',
            width: '100%',
            overflow: 'hidden',
          }
        : {}),
    };

    const textStyleAdjust = {
      ...textStyle,
      ...(checkStringIsNullOrWhiteSpace(colorValue)
        ? {}
        : { color: colorValue }),
      ...(multiLine ? {} : { whiteSpace: 'nowrap' }),
      ...(block
        ? {
            display: 'inline-block',
            overflow: 'hidden',
          }
        : {}),
    };

    return (
      <span
        style={styleAdjust}
        title={`${checkStringIsNullOrWhiteSpace(textPrefix) ? '' : textPrefix}${
          checkStringIsNullOrWhiteSpace(separator) ? '' : separator
        }${text}`}
        onClick={() => {
          this.copyText();
        }}
      >
        {checkStringIsNullOrWhiteSpace(textPrefix) ? (
          ''
        ) : (
          <>
            <span
              style={{
                ...textPrefixStyle,
                ...(block
                  ? {
                      display: 'inline-block',
                      overflow: 'hidden',
                    }
                  : {}),
              }}
            >
              {textPrefix}
            </span>

            {checkStringIsNullOrWhiteSpace(separator) ? null : (
              <span
                style={{
                  ...separatorStyle,
                  ...(block
                    ? {
                        display: 'inline-block',
                      }
                    : {}),
                }}
              >
                {separator}
              </span>
            )}
          </>
        )}

        <span style={textStyleAdjust}>{text}</span>
      </span>
    );
  }
}

ColorText.defaultProps = {
  style: null,
  textStyle: null,
  block: false,
  title: false,
  canCopy: false,
  randomSeed: 0,
  seedOffset: 0,
  randomColor: false,
  color: '',
  textPrefix: null,
  textPrefixStyle: null,
  text: '',
  separator: ':',
  multiLine: false,
  separatorStyle: null,
};

export { ColorText };
