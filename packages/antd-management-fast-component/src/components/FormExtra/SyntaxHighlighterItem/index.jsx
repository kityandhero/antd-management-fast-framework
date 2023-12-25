import React, { PureComponent } from 'react';

import { SyntaxHighlighter } from '../../SyntaxHighlighter';
import { ComponentItem } from '../ComponentItem';

class SyntaxHighlighterItem extends PureComponent {
  render() {
    const {
      language,
      label,
      value,
      helper = null,
      formItemLayout = {},
      requiredForShow = false,
      innerProps: innerProperties = {},
      hidden = false,
      addonBefore = null,
      addonBeforeStyle = null,
      addonAfter = null,
      addonAfterStyle = null,
    } = this.props;

    return (
      <ComponentItem
        label={label}
        helper={helper}
        innerComponent={
          <SyntaxHighlighter
            language={language}
            value={value}
            other={innerProperties || {}}
          />
        }
        requiredForShow={requiredForShow}
        formItemLayout={formItemLayout}
        hidden={hidden}
        addonBefore={addonBefore}
        addonBeforeStyle={addonBeforeStyle}
        addonAfter={addonAfter}
        addonAfterStyle={addonAfterStyle}
      />
    );
  }
}

SyntaxHighlighterItem.defaultProps = {
  language: 'javascript',
  label: '',
  value: '',
  helper: null,
  formItemLayout: {},
  requiredForShow: false,
  innerProps: {},
  hidden: false,
  addonBefore: null,
  addonBeforeStyle: null,
  addonAfter: null,
  addonAfterStyle: null,
};

export { SyntaxHighlighterItem };
