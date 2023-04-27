import { Drawer } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import styles from './index.less';

@connect(({ switchControl }) => ({
  switchControl,
}))
class DrawerExtra extends PureComponent {
  renderPresetTitle = () => {
    const { titlePrefix, title, subtitle } = this.props;

    const subtitleAdjust = checkStringIsNullOrWhiteSpace(subtitle)
      ? ''
      : `:【${subtitle}】`;

    return `${titlePrefix}${title || '标题'}${subtitleAdjust}`;
  };

  render() {
    const { flag, switchControl, children, icon, ...rest } = this.props;

    const v = !!switchControl[flag];

    return (
      <Drawer
        open={v || false}
        {...rest}
        title={
          <span>
            {icon}
            {icon ? (
              <>
                <span className={styles.titleText} /> {this.renderPresetTitle()}
              </>
            ) : (
              this.renderPresetTitle()
            )}
          </span>
        }
      >
        {children}
      </Drawer>
    );
  }
}

DrawerExtra.defaultProps = {
  icon: null,
  titlePrefix: null,
  title: null,
  subtitle: null,
};

export { DrawerExtra };
