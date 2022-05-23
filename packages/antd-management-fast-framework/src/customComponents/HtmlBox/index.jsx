import { Empty } from 'antd';
import { PureComponent } from 'react';
import { stringIsNullOrWhiteSpace } from '../../utils/tools';
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

    if (!!useEmpty && stringIsNullOrWhiteSpace(html)) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

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

HtmlBox.defaultProps = {
  useEmpty: true,
  html: '',
};

export default HtmlBox;
