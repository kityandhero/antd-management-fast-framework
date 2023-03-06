import React from 'react';

import { BaseComponent } from '../../BaseComponent';
import { SyntaxHighlighter } from '../../SyntaxHighlighter';
import { ComponentItem } from '../ComponentItem';

class SyntaxHighlighterItem extends BaseComponent {
  renderFurther() {
    const {
      language,
      label,
      value,
      helper = null,
      formItemLayout = {},
      requiredForShow = false,
      innerProps: innerProperties = {},
      hidden = false,
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
};

export { SyntaxHighlighterItem };
