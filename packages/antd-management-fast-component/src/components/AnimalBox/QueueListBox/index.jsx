import QueueAnim from 'rc-queue-anim';
import React, { PureComponent } from 'react';

import { isArray, isFunction } from 'easy-soft-utility';

import styles from './index.less';

class QueueListBox extends PureComponent {
  render() {
    const { style, show, itemStyle, items } = this.props;

    const listData = isArray(items) ? items : [];

    const listItem = [];

    for (const [index, o] of listData.entries()) {
      const {
        key,
        builder,
        hidden,
        style: liStyle,
      } = {
        builder: () => {
          return null;
        },
        hidden: false,
        style: null,
        ...o,

        key: `queue_box_item_${index}`,
      };

      if (!hidden && isFunction(builder)) {
        const item = builder(key);

        listItem.push(
          <li
            key={key}
            style={{
              ...itemStyle,
              ...liStyle,
            }}
          >
            {item}
          </li>,
        );
      }
    }

    return (
      <div className={styles.queueBox} style={style || null}>
        <QueueAnim component="ul" type={['right', 'left']} leaveReverse>
          {show ? listItem : null}
        </QueueAnim>
      </div>
    );
  }
}

QueueListBox.defaultProps = {
  show: true,
  style: null,
  items: [],
  itemStyle: null,
};

export { QueueListBox };
