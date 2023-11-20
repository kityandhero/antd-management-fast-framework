import { Checkbox } from 'antd';

import { connect } from 'easy-soft-dva';

import { drawerConfig } from 'antd-management-fast-common';
import { CenterBox, SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { code } from './codeSource';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '7fc0c679771c42cb9d8855fa00bb2104';

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
      submitApiPath: 'simple/updateBasicInfo',
      sourceCode: code,
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  subjoinDataOnAfterOK = () => {
    return {
      message: '这是一个增补数据, 将附加到 afterOk 方法中进行调用',
    };
  };

  buildBottomBarInnerLeftItemConfigList = () => {
    return [
      {
        buildType: drawerConfig.bottomBarBuildType.component,
        component: (
          <Checkbox style={{ marginLeft: '4px' }}>保存后跳转详情页</Checkbox>
        ),
      },
    ];
  };

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
