export const code = `import { connect } from 'easy-soft-dva';

import { extraBuildType, logTemplate } from 'antd-management-fast-common';
import {
  CenterBox,
  iconBuilder,
  SyntaxHighlighter,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { code } from './codeSource';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '415197d3bf4a40c68995c26d4512350c';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class ExtraActionDrawer extends BaseVerticalFlexDrawer {
  // showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '主标题',
      loadApiPath: 'simple/get',
      sourceCode: code,
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.iconInfo,
          icon: iconBuilder.infoCircle(),
          text: '一些说明',
        },
        {
          buildType: extraBuildType.button,
          icon: iconBuilder.form(),
          text: '按钮',
          handleClick: () => {},
        },
      ],
    };
  };

  establishExtraActionGroupConfig = () => {
    return {
      buttons: [
        {
          key: 'setOnline',
          type: 'default',
          size: 'default',
          text: '上架',
          icon: iconBuilder.upCircle(),
          handleButtonClick: ({ handleData }) => {
            logTemplate(handleData);
          },
          hidden: false,
          disabled: false,
          confirm: true,
          title: '设置为上架，确定吗？',
          placement: 'bottomRight',
          okText: '确定',
          cancelText: '取消',
          handleData: { text: 'text1' },
        },
        {
          key: 'setOffline',
          type: 'default',
          size: 'default',
          text: '下架',
          icon: iconBuilder.upCircle(),
          handleButtonClick: ({ handleData }) => {
            logTemplate(handleData);
          },
          hidden: false,
          disabled: false,
          confirm: true,
          title: '设置为下架，确定吗？',
          placement: 'bottomRight',
          okText: '确定',
          cancelText: '取消',
          handleData: { text: 'text2' },
        },
      ],
    };
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

  buildTitlePrevText = () => {
    return '前缀：';
  };

  buildTitleSubText = () => {
    return '副标题';
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

export { ExtraActionDrawer };
`;
