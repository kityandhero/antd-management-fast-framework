import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { isObject } from 'easy-soft-utility';

import { BaseComponent } from '../../bases';

class SyntaxHighlighter extends BaseComponent {
  renderFurther() {
    const { language, value, other } = this.props;

    const c = {
      ...other,
      showLineNumbers: false,
      wrapLines: false,
      wrapLongLines: true,
      language,
      style: oneDark,
    };

    return (
      <>
        {isObject(value) ? (
          <Prism {...c}>
            {language === 'javascript'
              ? JSON.stringify(value || {}, null, '    ')
              : value}
          </Prism>
        ) : (
          <Prism {...c}>
            {language === 'javascript'
              ? JSON.stringify(JSON.parse(value || null), null, '    ')
              : value}
          </Prism>
        )}
      </>
    );
  }
}

SyntaxHighlighter.defaultProps = {
  language: 'javascript',
  value: '',
  other: {},
};

export { SyntaxHighlighter };
