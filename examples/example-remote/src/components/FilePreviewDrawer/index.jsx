import { Empty } from 'antd';
import React from 'react';
import DocViewer from '@cyntler/react-doc-viewer';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  toLower,
} from 'easy-soft-utility';

import {
  buildPlayer,
  FrameBox,
  ImageBox,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'e0eda00627b94669ba28b1f2227e6ccb';

class FilePreviewDrawer extends BaseVerticalFlexDrawer {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  showReloadButton = false;

  frameRef = React.createRef();

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 1200,
      pageTitle: '文件预览',
      loadApiPath: '',
    };
  }

  getProperties = () => {
    return {
      url: '',
      suffix: '',
      ...this.props,
    };
  };

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = () => {};

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的是预览内容, 点击全屏按钮可以全屏查看',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { url, suffix } = this.getProperties();

    const suffixAdjust = toLower(suffix);

    if (checkStringIsNullOrWhiteSpace(url)) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Empty description="当前文件链接为空，无需预览，请配置后后查看" />
        </div>
      );
    }

    if (checkInCollection(['mp3', 'mp4'], suffixAdjust)) {
      return buildPlayer({ url: url });
    }

    if (checkInCollection(['jpeg', 'jpg', 'png', 'gif'], suffixAdjust)) {
      return (
        <div
          style={{
            // width: '100%',
            padding: '20px',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <ImageBox fillHeight={false} showMode="contentImage" src={url} />
        </div>
      );
    }

    if (checkInCollection(['pdf'], suffixAdjust)) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <FrameBox url={url} />
        </div>
      );
    }

    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <DocViewer
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
            csvDelimiter: ',', // "," as default,
            pdfZoom: {
              defaultZoom: 1.1, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
            pdfVerticalScrollByDefault: true, // false as default
          }}
          style={{ height: '100%' }}
          documents={[{ uri: url }]}
          initialActiveDocument={{ uri: url }}
        />
      </div>
    );
  };
}

export { FilePreviewDrawer };
