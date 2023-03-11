import React from 'react';

import {
  checkInCollection,
  isArray,
  isEmptyArray,
  logObject,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { contentConfig } from 'antd-management-fast-common';

import { BaseComponent } from '../../../BasicComponents';
import { HelpCard } from '../../HelpCard';

class HelpContent extends BaseComponent {
  renderFurther() {
    const { wrapperType: mode, title, showNumber, list } = this.props;

    if (!isArray(list)) {
      const text = '帮助条目数据无效';

      showSimpleErrorMessage(text);

      logObject(config);

      return null;
    }

    if (isEmptyArray(list)) {
      return null;
    }

    return (
      <HelpCard
        border={
          !checkInCollection(
            [contentConfig.wrapperType.model, contentConfig.wrapperType.drawer],
            mode,
          )
        }
        compact={mode === contentConfig.wrapperType.model}
        helpBoxProps={{
          title: title || '操作帮助',
          showNumber: showNumber || false,
          list,
        }}
      />
    );
  }
}

HelpContent.defaultProps = {
  wrapperType: contentConfig.wrapperType.page,
  title: '操作帮助',
  showNumber: true,
  list: [],
};

export { HelpContent };
