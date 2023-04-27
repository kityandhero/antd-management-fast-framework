import { Tag } from 'antd';
import QueueAnim from 'rc-queue-anim';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { reloadAnimalPromptControlAssist } from '../../utils/reloadAnimalPromptControlAssist';

@connect(({ reloadAnimalPromptControl }) => ({
  reloadAnimalPromptControl,
}))
class ReloadAnimalPrompt extends PureComponent {
  render() {
    const { reloadAnimalPromptControl, visible, color, text } = this.props;

    if (!visible) {
      return null;
    }

    const result = reloadAnimalPromptControlAssist.check(
      reloadAnimalPromptControl,
    );

    return (
      <QueueAnim>
        {result ? (
          <div key="d7521eec94194aeca0759c5a5bda41f0">
            <Tag color={color}>{text}</Tag>
          </div>
        ) : null}
      </QueueAnim>
    );
  }
}

ReloadAnimalPrompt.defaultProps = {
  visible: false,
  flag: '',
  color: 'gold',
  text: '即将刷新',
};

export { ReloadAnimalPrompt };
