import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { isObject, stringifyJson } from 'easy-soft-utility';

import { BaseComponent } from '../../bases';

class SyntaxHighlighter extends BaseComponent {
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const { language, value, style: customStyle, other } = this.props;

    const c = {
      ...other,
      showLineNumbers: false,
      wrapLines: false,
      wrapLongLines: true,
      language,
      style: oneDark,
      customStyle,
    };

    return (
      <>
        {isObject(value) ? (
          <Prism {...c}>
            {language === 'javascript'
              ? stringifyJson(value || {}, null, '    ')
              : value}
          </Prism>
        ) : (
          <Prism {...c}>
            {language === 'javascript'
              ? stringifyJson(JSON.parse(value || null), null, '    ')
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
  style: null,
};

export { SyntaxHighlighter };
