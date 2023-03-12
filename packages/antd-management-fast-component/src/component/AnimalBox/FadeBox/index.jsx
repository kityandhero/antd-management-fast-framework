import Animate from 'rc-animate';
import React, { PureComponent } from 'react';

import styles from './index.less';

class FadeBox extends PureComponent {
  render() {
    const { style, bodyStyle, show, children } = this.props;

    return (
      <div className={styles.fadeBox} style={style || null}>
        <Animate transitionName="fade" transitionAppear>
          {show ? <div style={bodyStyle || null}>{children}</div> : null}
        </Animate>
      </div>
    );
  }
}

FadeBox.defaultProps = {
  show: true,
  style: null,
  bodyStyle: null,
};

export { FadeBox };
