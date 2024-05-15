import { Space } from 'antd';

import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  convertOptionOrRadioData,
  FadeBox,
  iconBuilder,
  IconInfo,
  QueueBox,
  QueueListBox,
} from 'antd-management-fast-component';

import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeAnimalView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class AnimalView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Animal 交互示例',
      currentCodeTitle: 'AnimalView',
      currentCode: codeAnimalView,
      boxVisible: true,
    };
  }

  toggleFadeBoxShow = () => {
    const { boxVisible } = this.state;

    this.setState({
      boxVisible: !boxVisible,
    });
  };

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '操作栏',
      tools: [
        {
          component: buildButton({
            title: '点击切换动画显示',
            text: '切换动画显示',
            handleClick: () => {
              this.toggleFadeBoxShow();
            },
          }),
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle, boxVisible } = this.state;

    const that = this;

    const boxStyle = { height: '60px' };

    return {
      list: [
        {
          title: {
            text: '动画展示 [FadeBox]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <FadeBox visible={boxVisible}>
                    <div>
                      <Space>
                        <IconInfo icon={iconBuilder.form()} text="文字1" />
                        <IconInfo icon={iconBuilder.form()} text="文字2" />
                        <IconInfo icon={iconBuilder.form()} text="文字3" />
                      </Space>
                    </div>
                  </FadeBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '动画展示 [QueueBox]',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:null]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'left'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:left]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'right'} duration={600}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:right]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'top'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:top]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'bottom'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:bottom]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'scale'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:scale]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'scaleBig'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:scaleBig]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'scaleX'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:scaleX]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'scaleY'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:scaleY]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={'alpha'}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:alpha]"
                    />
                  </QueueBox>
                </div>
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueBox show={boxVisible} type={['right', 'alpha']}>
                    <IconInfo
                      icon={iconBuilder.form()}
                      text="QueueBox [type:['right', 'alpha']]"
                    />
                  </QueueBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '动画展示 [QueueListBox]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={boxStyle}>
                  <QueueListBox
                    show={boxVisible}
                    itemStyle={{
                      marginBottom: '2px',
                    }}
                    items={[
                      {
                        hidden: true,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 1"
                            />
                          );
                        },
                      },
                      {
                        hidden: false,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 2"
                            />
                          );
                        },
                      },
                      {
                        hidden: true,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 3"
                            />
                          );
                        },
                      },
                      {
                        hidden: false,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 4"
                            />
                          );
                        },
                      },
                    ]}
                  />
                </div>
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
                      code = codeAnimalView;
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

export default AnimalView;
