import { Checkbox } from 'antd';

import { connect } from 'easy-soft-dva';

import { cardConfig, drawerConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../../../businessData/data';
import { accessWayCollection } from '../../../customConfig/accessWayCollection';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'e5c655904024446199b71884b6e8993f';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  componentAuthority = accessWayCollection.simple.addBasicInfo.permission;

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,

      loadApiPath: 'simple/get',
      submitApiPath: 'simple/addBasicInfo',
    };
  }

  subjoinDataOnAfterOK = () => {
    return {
      message:
        '这是一个增补数据, 将附加到 afterOk 或 afterClose 方法的 subjoinData 参数',
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
    return '新增选项';
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
}

export default AddBasicInfoDrawer;
