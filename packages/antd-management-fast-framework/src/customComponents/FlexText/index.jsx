import React, { PureComponent } from 'react';
import { Space } from 'antd';

import IconInfo from '../IconInfo';
import FlexBox from '../FlexBox';

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
      style,
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
              text={text}
              ellipsis={ellipsis}
              ellipsisMaxWidth={textEllipsisMaxWidth}
            />

            {(subText || null) == null ? null : (
              <span className={styles.subText} style={subTextStyle || {}}>
                {subText}
              </span>
            )}

            {(addonAfter || null) == null ? null : addonAfter}
          </Space>
        }
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
  style: null,
};

export default FlexText;
