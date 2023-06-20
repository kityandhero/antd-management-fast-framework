import React, { PureComponent } from 'react';

import { QueueListBox } from '../QueueListBox';

class QueueBox extends PureComponent {
  render() {
    const {
      show,
      type,
      style,
      animConfig,
      leaveReverse,
      ease,
      delay,
      duration,
      interval,
      appear,
      animatingClassName,
      onEnd,
      children,
    } = this.props;

    return (
      <QueueListBox
        show={show}
        type={type}
        style={style}
        animConfig={animConfig}
        leaveReverse={leaveReverse}
        ease={ease}
        delay={delay}
        duration={duration}
        interval={interval}
        appear={appear}
        animatingClassName={animatingClassName}
        onEnd={onEnd}
        items={[
          {
            hidden: (children || null) == null,
            builder: () => {
              return children || null;
            },
          },
        ]}
      />
    );
  }
}

QueueBox.defaultProps = {
  show: true,
  type: ['right', 'left'],
  style: null,
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

export { QueueBox };
