import { connect } from 'easy-soft-dva';
import {
  getValueByKey,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig, selectModeCollection } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';

import { SelectButton } from '../../../businessComponents/SelectButton';
import { fieldData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeSelectButtonView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class SelectButtonView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'SelectButton 示例',
      currentCodeTitle: 'SelectButtonView',
      currentCode: codeSelectButtonView,
      selectData: null,
    };
  }

  afterSelect = (o) => {
    this.setState({ selectData: o });
  };

  establishCardCollectionConfig = () => {
    const { selectData, currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: 'SelectButton 示例',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: selectData,
                key: fieldData.title.name,
                defaultValue: '点击按钮选择文章',
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.customSelect,
              component: (
                <SelectButton
                  selectMode={selectModeCollection.drawer}
                  label="选择文章"
                  text="选择文章【Drawer】"
                  helper=""
                  afterSelectSuccess={(d) => {
                    this.afterSelect(d);
                  }}
                />
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.customSelect,
              component: (
                <SelectButton
                  selectMode={selectModeCollection.modal}
                  label="选择文章"
                  text="选择文章【Modal】"
                  labelWidth={90}
                  helper=""
                  afterSelectSuccess={(d) => {
                    this.afterSelect(d);
                  }}
                />
              ),
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
                defaultValue: 'SelectButtonView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'SelectButtonView',
                    name: 'SelectButtonView',
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

                    case 'SelectButtonView': {
                      code = codeSelectButtonView;
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

export default SelectButtonView;
