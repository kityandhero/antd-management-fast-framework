import { Button, Modal } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import styles from './index.less';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ModalExtra extends PureComponent {
  getProperties = () => {
    return {
      icon: null,
      titlePrefix: null,
      title: null,
      destroyOnClose: false,
      ...this.props,
    };
  };

  buildBodyStyle = () => {
    const { overlayContent } = this.getProperties();

    if (overlayContent == null) {
      return {};
    }

    return {
      position: 'relative',
      overflowX: 'hidden',
    };
  };

  buildStyles = () => {
    const { styles: styleCollection } = this.getProperties();

    const { header, body, footer, mask, wrapper } = {
      header: {},
      body: {},
      footer: {},
      mask: {},
      wrapper: {},
      ...styleCollection,
    };

    const bodyStyleAdjust = {
      ...body,
      ...this.buildBodyStyle(),
    };

    return {
      header,
      body: bodyStyleAdjust,
      footer,
      mask,
      wrapper,
    };
  };

  renderPresetTitle = () => {
    const { titlePrefix, title } = this.getProperties();

    return `${titlePrefix}${title || '标题'}`;
  };

  renderOverlayControlButton = () => {
    const { overlayContent, overlayButtonOpenText, overlayButtonCloseText } =
      this.getProperties();

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
    const { flag, switchControl, children, icon, destroyOnClose, ...rest } =
      this.getProperties();

    const v = !!switchControl[flag];
    const styleCollection = this.buildStyles();

    return (
      <Modal
        open={v || false}
        destroyOnClose={destroyOnClose || false}
        {...rest}
        styles={styleCollection}
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

export { ModalExtra };
