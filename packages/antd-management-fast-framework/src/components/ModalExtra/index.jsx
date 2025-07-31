import { Button, Modal, Tooltip } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace, isString } from 'easy-soft-utility';

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
      destroyOnHidden: false,
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
    const { flag, switchControl, children, icon, destroyOnHidden, ...rest } =
      this.getProperties();

    const v = !!switchControl[flag];
    const styleCollection = this.buildStyles();
    const title = this.renderPresetTitle();
    const titleIsText = isString(title);

    const textComponentInner = (
      <span>
        {icon}
        {icon ? (
          <>
            <span className={styles.titleText} /> {title}
          </>
        ) : (
          title
        )}
      </span>
    );

    const textComponentWrapper =
      !titleIsText || checkStringIsNullOrWhiteSpace(title) ? (
        textComponentInner
      ) : (
        <Tooltip title={title} placement="bottomLeft">
          {textComponentInner}
        </Tooltip>
      );

    return (
      <Modal
        open={v || false}
        destroyOnHidden={destroyOnHidden || false}
        {...rest}
        styles={styleCollection}
        title={textComponentWrapper}
      >
        {children}
      </Modal>
    );
  }
}

export { ModalExtra };
