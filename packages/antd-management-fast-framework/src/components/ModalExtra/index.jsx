import { Button, Modal } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import styles from './index.less';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ModalExtra extends PureComponent {
  buildBodyStyle = () => {
    const { overlayContent } = this.props;

    if (overlayContent == null) {
      return {};
    }

    return {
      position: 'relative',
      overflowX: 'hidden',
    };
  };

  renderPresetTitle = () => {
    const { titlePrefix, title } = this.props;

    return `${titlePrefix}${title || '标题'}`;
  };

  renderOverlayControlButton = () => {
    const { overlayContent, overlayButtonOpenText, overlayButtonCloseText } =
      this.props;

    if (overlayContent == null) {
      return null;
    }

    const { overlayVisible } = this.state;

    return (
      <Button
        onClick={() => {
          this.setState({ overlayVisible: !overlayVisible });
        }}
      >
        {overlayVisible
          ? overlayButtonCloseText || '关闭浮层'
          : overlayButtonOpenText || '打开浮层'}
      </Button>
    );
  };

  render() {
    const { flag, switchControl, children, icon, bodyStyle, ...rest } =
      this.props;

    const v = !!switchControl[flag];

    return (
      <Modal
        open={v || false}
        {...rest}
        bodyStyle={{
          ...bodyStyle,
          ...this.buildBodyStyle(),
        }}
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
      </Modal>
    );
  }
}

ModalExtra.defaultProps = {
  icon: null,
  titlePrefix: null,
  title: null,
};

export { ModalExtra };
