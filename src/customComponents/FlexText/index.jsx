import React, { PureComponent } from 'react';
import { Space } from 'antd';

import { stringIsNullOrWhiteSpace } from '@/utils/tools';
import FlexBox from '@/customComponents/FlexBox';

import styles from './index.less';

class FlexText extends PureComponent {
  render() {
    const {
      icon,
      textPrefix,
      text,
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
            {(icon || null) == null ? null : <span>{icon}</span>}
            <span>
              {stringIsNullOrWhiteSpace(textPrefix) ? null : `${textPrefix}：`}
              {text}
            </span>
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
  subText: '',
  subTextStyle: null,
  extra: null,
  style: null,
};

export default FlexText;
