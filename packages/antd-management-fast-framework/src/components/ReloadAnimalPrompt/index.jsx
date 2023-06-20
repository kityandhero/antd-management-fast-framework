import { Tag } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { QueueBox } from 'antd-management-fast-component';

import { reloadAnimalPromptControlAssist } from '../../utils/reloadAnimalPromptControlAssist';

@connect(({ reloadAnimalPromptControl }) => ({
  reloadAnimalPromptControl,
}))
class ReloadAnimalPrompt extends PureComponent {
  render() {
    const { reloadAnimalPromptControl, visible, flag, color, text } =
      this.props;

    if (!visible) {
      return null;
    }

    const spinning = reloadAnimalPromptControlAssist.check(
      reloadAnimalPromptControl,
      flag,
    );

    return (
      <QueueBox show={spinning} type={'right'}>
        <div key={this.keyPrefix}>
          <Tag color={color}>{text}</Tag>
        </div>
      </QueueBox>
    );
  }
}

ReloadAnimalPrompt.defaultProps = {
  visible: false,
  flag: '',
  color: 'gold',
  text: '即将刷新',
  delay: 0,
};

export { ReloadAnimalPrompt };
