import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { code } from '../ModalView/codeSource';

const { BaseNeedlessLoadDrawer } = DataDrawer;

const visibleFlag = '87e04a6ccacb439d879dfd97d9cdd64d';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class ModalCodeView extends BaseNeedlessLoadDrawer {
  showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  renderPresetTitle = () => {
    return '页面代码';
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: code,
              language: 'js',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
        },
      ],
    };
  };
}

export default ModalCodeView;
