import { Space, Tag } from 'antd';
import TextAnimal from 'rc-texty';
import React from 'react';

import { isArray } from 'easy-soft-utility';

import { BaseComponent } from '../../bases';

class ElasticityTagList extends BaseComponent {
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const { wrap, size, split, list } = this.props;

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
      <Space wrap={wrap} size={size} split={split}>
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

ElasticityTagList.defaultProps = {
  wrap: false,
  size: 'small',
  split: null,
  list: [],
};

export { ElasticityTagList };
