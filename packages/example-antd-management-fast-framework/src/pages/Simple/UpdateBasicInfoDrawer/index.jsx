import { connect } from 'easy-soft-dva';
import { formatCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/accessWayCollection';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'b6ee74db71ab4c0c88da4ceaf2f7138e';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class Index extends BaseUpdateDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  componentAuthority = accessWayCollection.simple.updateBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,

      loadApiPath: 'simple/get',
      submitApiPath: 'simple/updateBasicInfo',
      imageUrl: '',
      appHeadImage: '',
    };
  }

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.simpleId = getValueByKey({
      data: externalData,
      key: fieldData.simpleId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.simpleId = getValueByKey({
      data: externalData,
      key: fieldData.simpleId.name,
    });

    return d;
  };

  renderPresetTitle = () => {
    return '编辑选项信息';
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const spinning = this.checkInProgress();

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          spinning,
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
          spinning,
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
          spinning,
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
                format: formatCollection.datetime,
              }),
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

export default Index;
