import { Space, Tag } from 'antd';
import TextAnimal from 'rc-texty';
import React from 'react';

import { isArray, logExecute } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';

class AmfTagList extends BaseComponent {
  renderFurther() {
    logExecute('renderFurther', 'AmfTagList');

    const { list } = this.props;

    if (!isArray(list)) {
      return null;
    }

    if (list.length === 0) {
      return null;
    }

    const tagList = [];

    for (const [index, o] of list.entries()) {
      const { key, color, text, hidden } = {
        key: `pageHeaderTag_${index}`,
        color: '#000',
        text: '未知',
        hidden: false,
        ...o,
      };

      if (!hidden) {
        tagList.push({
          key,
          color,
          text,
        });
      }
    }

    if (tagList.length <= 0) {
      return null;
    }

    return (
      <Space>
        {tagList.map((o) => {
          const { key, text, color } = o;

          return (
            <Tag key={key} color={color}>
              <TextAnimal type="left" mode="smooth">
                {text}
              </TextAnimal>
            </Tag>
          );
        })}
      </Space>
    );
  }
}

AmfTagList.defaultProps = {
  list: [],
};

export { AmfTagList };
