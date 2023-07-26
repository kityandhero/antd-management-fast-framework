import { connect } from 'easy-soft-dva';
import {
  formatCollection,
  getValueByKey,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildColorText,
  convertOptionOrRadioData,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeFormView } from './codeSource';

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
      pageTitle: 'Form 交互示例',
      currentCodeTitle: 'FormView',
      currentCode: codeFormView,
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
    const { metaData, currentCode, currentCodeTitle, listTreeData, parentId } =
      this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '基本信息',
            subText: buildColorText({
              textPrefix: '文本前缀',
              text: '附属文本',
              color: '#8909ef',
              wrapperBuilder: (c) => {
                return <>【{c}】</>;
              },
            }),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.simpleId,
              value: getValueByKey({
                data: metaData,
                key: fieldData.simpleId.name,
              }),
              canCopy: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '分隔线',
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.datePicker,
              fieldData: fieldData.datePicker,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.timePicker,
              fieldData: fieldData.timePicker,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.parentId,
              value: parentId,
              require: true,
              listData: listTreeData,
              dataConvert: (o) => {
                const { label, code: value, children } = o;

                return {
                  title: label,
                  value,
                  children: children || [],
                };
              },
              onChangeCallback: ({
                value,
                // eslint-disable-next-line no-unused-vars
                label,
                // eslint-disable-next-line no-unused-vars
                extra,
                treeData,
                // eslint-disable-next-line no-unused-vars
                listData,
              }) => {
                console.log(treeData);

                this.setState({
                  parentId: value,
                });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: (
                <IconInfo
                  icon={iconBuilder.edit()}
                  text="分隔线"
                  ellipsis={false}
                />
              ),
            },
            {
              lg: 224,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
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
            text: fieldData.switch.label,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.switch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: (v) => {
                  this.handleSwitchChange(v);
                },
              },
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
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
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
                defaultValue: 'FormView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'FormView',
                    name: 'FormView',
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

                    case 'FormView': {
                      code = codeFormView;
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

  renderPresetPageFooter = () => {
    return 'PageFooter';
  };
}

export default NormalView;
