import { Space } from 'antd';
import React, { PureComponent } from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { FlexBox } from '../FlexBox';
import { IconInfo } from '../IconInfo';

import styles from './index.less';

class FlexText extends PureComponent {
  render() {
    const {
      flexAuto: flexAutoSource,
      icon,
      textPrefix,
      text,
      ellipsis,
      textEllipsisMaxWidth,
      subText,
      subTextStyle,
      addonBefore,
      addonAfter,
      extra,
      extraStyle,
      style,
      color,
      separator,
      separatorStyle,
    } = this.props;

    return (
      <FlexBox
        style={style}
        flexAuto={flexAutoSource}
        left={
          <Space>
            {(addonBefore || null) == null ? null : addonBefore}

            <IconInfo
              icon={icon}
              textPrefix={textPrefix}
              separator={separator}
              separatorStyle={separatorStyle}
              text={text}
              ellipsis={ellipsis}
              ellipsisMaxWidth={textEllipsisMaxWidth}
              style={checkStringIsNullOrWhiteSpace(color) ? {} : { color }}
            />

            {(subText || null) == null ? null : (
              <span className={styles.subText} style={subTextStyle || {}}>
                {subText}
              </span>
            )}

            {(addonAfter || null) == null ? null : addonAfter}
          </Space>
        }
        rightStyle={extraStyle}
        right={extra}
      />
    );
  }
}

FlexText.defaultProps = {
  flexAuto: 'left',
  icon: null,
  textPrefix: null,
  text: '',
  ellipsis: true,
  textEllipsisMaxWidth: 0,
  subText: '',
  subTextStyle: null,
  extra: null,
  extraStyle: null,
  style: null,
  color: '',
  separator: ': ',
  separatorStyle: null,
};

export { FlexText };
