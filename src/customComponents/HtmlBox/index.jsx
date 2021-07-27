import React, { PureComponent } from 'react';

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
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = children;
    }
  };

  render() {
    return (
      <span
        className={styles.richTextBox}
        ref={(ref) => {
          this.main = ref;
        }}
      />
    );
  }
}

export default HtmlBox;
