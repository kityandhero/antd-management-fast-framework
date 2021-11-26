import React, { PureComponent } from 'react';
import { Space } from 'antd';

import IconInfo from '../IconInfo';
import FlexBox from '../FlexBox';

import styles from './index.less';

class FlexText extends PureComponent {
  render() {
    const {
      icon,
      textPrefix,
      text,
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
        left={
          <Space>
            {(addonBefore || null) == null ? null : addonBefore}

            <IconInfo
              icon={icon}
              textPrefix={textPrefix}
              text={text}
              ellipsis
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
  icon: null,
  textPrefix: null,
  text: '',
  textEllipsisMaxWidth: 0,
  subText: '',
  subTextStyle: null,
  extra: null,
  style: null,
};

export default FlexText;
