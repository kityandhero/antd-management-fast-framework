import { Drawer, Empty } from 'antd';
import parse from 'html-react-parser';

import CustomBase from '../../framework/CustomBase';
import { imageContentPreviewMode } from '../../utils/constants';

import styles from './index.less';

class ImageContentPreview extends CustomBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible: false,
        htmlContent: '',
        imageList: [],
        listItem: [],
        mode: imageContentPreviewMode.html,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, mode, imageList, listItem, htmlContent } = nextProps;

    return {
      visible,
      mode: mode || imageContentPreviewMode.html,
      imageList: imageList || [],
      listItem: listItem || [],
      htmlContent: htmlContent || '',
    };
  }

  onClose = () => {
    const { afterClose } = this.props;
    afterClose();
  };

  render() {
    const { visible, mode, imageList, listItem, htmlContent } = this.state;

    if (mode === imageContentPreviewMode.imageList) {
      const imageListHtmlContent = (imageList || [])
        .map((item) => `<img src="${item}" alt="" />`)
        .join('');

      return (
        <Drawer
          title="图片详情预览"
          width={380}
          placement="left"
          visible={visible}
          closable
          onClose={this.onClose}
        >
          {imageListHtmlContent ? (
            <div
              className={styles.previewContainor}
              // dangerouslySetInnerHTML={{ __html: imageListHtmlContent }}
            >
              {parse(imageListHtmlContent)}
            </div>
          ) : (
            <Empty />
          )}
        </Drawer>
      );
    }

    if (mode === imageContentPreviewMode.listItem) {
      const listItemHtmlContent = (listItem || [])
        .map(
          (item) =>
            `<img src="${item.image}" alt="" /><p>${item.description}</p>`,
        )
        .join('');

      return (
        <Drawer
          title="图片详情预览"
          width={380}
          placement="left"
          visible={visible}
          closable
          onClose={this.onClose}
        >
          {listItemHtmlContent ? (
            <div
              className={styles.previewContainor}

              // dangerouslySetInnerHTML={{ __html: htmlContent }}
            >
              {parse(htmlContent)}
            </div>
          ) : (
            <Empty />
          )}
        </Drawer>
      );
    }

    if (mode === imageContentPreviewMode.html) {
      return (
        <Drawer
          title="图片详情预览"
          width={380}
          placement="left"
          visible={visible}
          closable
          onClose={this.onClose}
        >
          {htmlContent ? (
            <div
              className={styles.previewContainor}
              // dangerouslySetInnerHTML={{ __html: htmlContent }}
            >
              {parse(htmlContent)}
            </div>
          ) : (
            <Empty />
          )}
        </Drawer>
      );
    }

    return (
      <Drawer
        title="图片详情预览"
        width={380}
        placement="left"
        visible={visible}
        closable
        onClose={this.onClose}
      >
        <Empty />
      </Drawer>
    );
  }
}

export default ImageContentPreview;
