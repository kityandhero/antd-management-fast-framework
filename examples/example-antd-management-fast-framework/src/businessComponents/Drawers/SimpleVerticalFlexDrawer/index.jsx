import { connect } from 'easy-soft-dva';

import { CenterBox, SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { code } from './codeSource';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '0ddf863464134dadb40a207b3e901237';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleVerticalFlexDrawer extends BaseVerticalFlexDrawer {
  // showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'simple/get',
      sourceCode: code,
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  renderPresetTitle = () => {
    return '编辑信息';
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#4563ef',
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明:这里可以显示需要提示的信息, 这里可以显示需要提示的信息, 这里可以显示需要提示的信息, 这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明:这里可以显示需要提示的信息, 这里可以显示需要提示的信息, 这里可以显示需要提示的信息, 这里可以显示需要提示的信息, 这里可以显示需要提示的信息, 这里可以显示需要提示的信息, 这里可以显示需要提示的信息。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    return (
      <div style={{ height: '800px' }}>
        <CenterBox>content</CenterBox>
      </div>
    );
  };

  renderOverlayContent = () => {
    const { sourceCode } = this.state;

    return (
      <div style={{ width: '90%', height: '90%' }}>
        <SyntaxHighlighter
          language="js"
          value={sourceCode}
          other={{ showLineNumbers: false, wrapLines: false }}
          style={{ height: '100%' }}
        />
      </div>
    );
  };
}

export { SimpleVerticalFlexDrawer };
