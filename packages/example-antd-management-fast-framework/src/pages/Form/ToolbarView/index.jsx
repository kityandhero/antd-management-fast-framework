import { connect } from 'easy-soft-dva';
import {
  formatCollection,
  getValueByKey,
  mergeArrowText,
  showInfoMessage,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  buildColorText,
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import {
  renderCustomSimpleStatusRadio,
  renderCustomSimpleStatusSelect,
} from '../../../customSpecialComponents';
import BaseView from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeFormView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class RadioView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Form 交互示例',
      currentCodeTitle: 'FormView',
      currentCode: codeFormView,
      attachmentBase64: '',
      image: '',
      rectangleImage: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  handleSwitchChange = (value) => {};

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: buildButton({
            text: '按钮1',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '按钮提示4',
          hidden: false,
          component: buildButton({
            text: '按钮4',
            handleClick: () => {
              showInfoMessage({
                text: 'click button 4',
              });
            },
            confirm: true,
            placement: 'topRight',
            title: '将要进行操作，确定吗？',
            okText: '确定',
            cancelText: '取消',
          }),
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { metaData, currentCode, currentCodeTitle } = this.state;

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
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '一些说明',
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomSimpleStatusRadio({}),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomSimpleStatusSelect({}),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: '一般按钮',
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: true,
                icon: iconBuilder.form(),
                text: '隐藏按钮',
              },
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
            {
              lg: 24,
              type: cardConfig.contentItemType.save,
              config: {
                text: '底部单行保存按钮',
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.button,
              config: {
                text: '底部一般单行按钮',
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.actionList,
              config: [
                {
                  buildType: cardConfig.extraBuildType.refresh,
                  text: '底部刷新按钮',
                },
                {
                  buildType: cardConfig.extraBuildType.save,
                  text: '底部保存按钮',
                },
                {
                  buildType: cardConfig.extraBuildType.generalButton,
                  text: '底部一般按钮',
                },
              ],
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

  renderPresetPageFooter = () => {
    return 'PageFooter';
  };
}

export default RadioView;
