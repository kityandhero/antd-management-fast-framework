import QueueAnim from 'rc-queue-anim';
import React, { PureComponent } from 'react';

import { isArray, isFunction } from 'easy-soft-utility';

import styles from './index.less';

class QueueListBox extends PureComponent {
  triggerEnd = ({ key, type }) => {
    const { onEnd } = this.props;

    if (isFunction(onEnd)) {
      onEnd({ key, type });
    }
  };

  render() {
    const {
      style,
      show,
      type,
      animConfig,
      itemStyle,
      leaveReverse,
      ease,
      delay,
      duration,
      interval,
      appear,
      animatingClassName,
      items,
    } = this.props;

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
        <QueueAnim
          component="ul"
          type={type}
          animConfig={animConfig}
          leaveReverse={leaveReverse}
          ease={ease}
          delay={delay}
          duration={duration}
          interval={interval}
          appear={appear}
          animatingClassName={animatingClassName}
          onEnd={this.triggerEnd}
        >
          {show ? listItem : null}
        </QueueAnim>
      </div>
    );
  }
}

QueueListBox.defaultProps = {
  show: true,
  type: 'right',
  style: null,
  items: [],
  itemStyle: null,
  animConfig: null,
  leaveReverse: false,
  ease: 'easeOutQuart',
  delay: 0,
  duration: 450,
  interval: 100,
  appear: true,
  animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
  onEnd: null,
};

export { QueueListBox };
