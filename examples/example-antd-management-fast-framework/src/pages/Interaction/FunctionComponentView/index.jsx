import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig, logTemplate } from 'antd-management-fast-common';
import {
  buildDropdownMenu,
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';

import {
  refitWebChannelList,
  renderFormWebChannelRadio,
  renderFormWebChannelSelect,
} from '../../../customSpecialComponents';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class FunctionComponentView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'FunctionComponentView 交互示例',
      currentCodeTitle: 'FunctionComponentView',
      currentCode: codeView,
      boxVisible: true,
    };
  }

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: 'FunctionComponent',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: buildDropdownMenu({
                label: '下拉菜单1',
                placement: 'bottomRight',
                icon: null,
                size: 'middle',
                type: 'default',
                list: refitWebChannelList({ withUnlimited: false }),
                dataConvert: null,
                onClick: null,
                innerProps: null,
                extra: null,
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: buildDropdownMenu({
                label: '下拉菜单2',
                placement: 'bottom',
                icon: iconBuilder.edit(),
                size: 'middle',
                type: 'link',
                hidden: false,
                list: refitWebChannelList({ withUnlimited: false }),
                dataConvert: null,
                extraStyle: { paddingLeft: '4px' },
                extra: iconBuilder.down({
                  style: {
                    fontSize: '10px',
                  },
                }),
                innerProps: {
                  border: '0',
                  height: '22px',
                  style: {
                    padding: '0',
                    height: '22px',
                  },
                },
                onClick: ({ key }) => {
                  logTemplate({ key });
                },
              }),
            },
          ],
        },
        {
          title: {
            text: 'FunctionComponent',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: buildDropdownMenu({
                label: '下拉菜单',
                placement: 'bottomRight',
                icon: null,
                size: 'middle',
                type: 'default',
                list: refitWebChannelList({ withUnlimited: false }),
                dataConvert: null,
                onClick: null,
                innerProps: null,
                extra: null,
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderFormWebChannelSelect({}),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormWebChannelRadio({}),
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
                defaultValue: 'AnimalView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'AnimalView',
                    name: 'AnimalView',
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

                    case 'AnimalView': {
                      code = codeView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(`当前显示 ${v} 源代码`);
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
}

export default FunctionComponentView;
