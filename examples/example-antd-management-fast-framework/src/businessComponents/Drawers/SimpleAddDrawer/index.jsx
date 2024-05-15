import { Checkbox } from 'antd';

import { connect } from 'easy-soft-dva';

import { cardConfig, drawerConfig } from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../../../businessData/data';

import { code } from './codeSource';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '35f84a341e49444a994b61add41acf9b';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleAddDrawer extends BaseAddDrawer {
  showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath: 'simple/addBasicInfo',
      sourceCode: code,
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  subjoinDataOnAfterOK = () => {
    return {
      message:
        '这是一个增补数据, 将附加到 afterOk 或 afterClose 方法的 subjoinData 参数',
    };
  };

  subjoinDataOnAfterClose = () => {
    return {
      otherData: '其他数据',
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
    return '新增信息';
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '这是一些操作说明1',
              },
              {
                text: '这是一些操作说明2',
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介描述',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
          instruction: [
            {
              title: '局部操作说明1',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
            {
              title: '局部操作说明2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
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
          text: '简要说明:这里可以显示需要提示的信息。',
        },
      ],
    };
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

export { SimpleAddDrawer };
