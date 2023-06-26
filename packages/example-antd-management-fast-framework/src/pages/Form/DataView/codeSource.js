export const code = `import { connect } from 'easy-soft-dva';
import {
  formatCollection,
  getValueByKey,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import BaseView from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeDataView } from './codeSource';

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class NormalView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Data 示例',
      currentCodeTitle: 'DataView',
      currentCode: codeDataView,
    };
  }

  establishPageHeaderSubTitle = () => '复杂的组件展示';

  establishPageHeaderTagCollectionConfig = () => {
    return [
      {
        color: 'red',
        text: '标签1',
      },
      {
        color: 'green',
        text: '标签2',
        hidden: true,
      },
    ];
  };

  establishCardCollectionConfig = () => {
    const { metaData, currentCode, currentCodeTitle, image, imageList } =
      this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.picture(),
            text: '示例',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageShow,
              image,
              imageBoxContainorStyle: {
                width: '120px',
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图集合纯展示',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageListShow,
              imageList,
            },
          ],
        },
        {
          title: {
            text: '简介描述',
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.description.name,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '空白数据',
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: '',
            },
          ],
          instruction: [
            {
              title: '说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html数据展示, 空白将替换为Empty',
                },
              ],
            },
          ],
        },

        {
          title: {
            text: '其他信息',
          },

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

        {
          title: {
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                label: '显示源代码',
                size: 'small',
                defaultValue: 'DataView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'DataView',
                    name: 'DataView',
                  },
                ],
                dataConvert: convertOptionOrRadioData,
                onChange: (v) => {
                  let code = '';

                  switch (v) {
                    case 'BaseView': {
                      code = codeBaseView;
                      break;
                    }

                    case 'DataView': {
                      code = codeDataView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(\`当前显示 \${v} 源代码\`);
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: currentCode,
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

  renderPresetPageFooter = () => {
    return 'PageFooter';
  };
}

export default NormalView;
`;
