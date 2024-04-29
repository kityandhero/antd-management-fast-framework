import { Tag } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { QueueBox } from 'antd-management-fast-component';

import { reloadAnimalPromptControlAssist } from '../../utils/reloadAnimalPromptControlAssist';

@connect(({ reloadAnimalPromptControl }) => ({
  reloadAnimalPromptControl,
}))
class ReloadAnimalPrompt extends PureComponent {
  getProperties = () => {
    return {
      hide: false,
      flag: '',
      color: 'gold',
      text: '即将刷新',
      delay: 0,
      ...this.props,
    };
  };

  render() {
    const { reloadAnimalPromptControl, hide, flag, color, text } =
      this.getProperties();

    if (hide) {
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

export { ReloadAnimalPrompt };
