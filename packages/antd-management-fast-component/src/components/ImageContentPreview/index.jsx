import { Drawer, Empty } from 'antd';
import parse from 'html-react-parser';
import React from 'react';

import { imageContentPreviewMode } from 'antd-management-fast-common';

import { BaseComponent } from '../../bases';

import styles from './index.less';

class ImageContentPreview extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      visible: false,
      htmlContent: '',
      imageList: [],
      listItem: [],
      mode: imageContentPreviewMode.html,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { visible, mode, imageList, listItem, htmlContent } = nextProperties;

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
          open={visible}
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
          open={visible}
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
          open={visible}
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
        open={visible}
        closable
        onClose={this.onClose}
      >
        <Empty />
      </Drawer>
    );
  }
}

export { ImageContentPreview };
