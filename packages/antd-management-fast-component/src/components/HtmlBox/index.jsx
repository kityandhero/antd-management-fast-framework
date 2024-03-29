import { Empty } from 'antd';
import React, { PureComponent } from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import styles from './index.less';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
class HtmlBox extends PureComponent {
  componentDidMount() {
    this.renderToHtml();
  }

  componentDidUpdate() {
    this.renderToHtml();
  }

  renderToHtml = () => {
    const { html } = this.props;

    if (this.main) {
      this.main.innerHTML = html;
    }
  };

  render() {
    const { useEmpty, html } = this.props;

    if (!!useEmpty && checkStringIsNullOrWhiteSpace(html)) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return (
      <span
        className={styles.richTextBox}
        ref={(reference) => {
          this.main = reference;
        }}
      />
    );
  }
}

HtmlBox.defaultProps = {
  useEmpty: true,
  html: '',
};

export { HtmlBox };
