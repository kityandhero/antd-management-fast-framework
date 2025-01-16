import { Button, Drawer, Space, Tooltip } from 'antd';
import React, { Fragment, PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isString,
} from 'easy-soft-utility';

import { Overlay } from 'antd-management-fast-component';

import styles from './index.less';

@connect(({ switchControl }) => ({
  switchControl,
}))
class DrawerExtra extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      overlayVisible: false,
    };
  }

  getProperties = () => {
    return {
      styles: {},
      icon: null,
      titlePrefix: null,
      title: null,
      subtitle: null,
      destroyOnClose: false,
      overlayContent: null,
      overlayButtonOpenText: '打开浮层',
      overlayButtonCloseText: '关闭浮层',
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
    const { titlePrefix, title, subtitle } = this.getProperties();

    const subtitleAdjust = checkStringIsNullOrWhiteSpace(subtitle)
      ? ''
      : `:【${subtitle}】`;

    return `${titlePrefix}${title || '标题'}${subtitleAdjust}`;
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

  renderExtra = () => {
    const { extra } = this.getProperties();

    const extraActions = [];

    const overlayControlButton = this.renderOverlayControlButton();

    if (overlayControlButton != null) {
      extraActions.push(overlayControlButton);
    }

    if (extraActions.length === 0) {
      if (isArray(extra)) {
        // eslint-disable-next-line no-unused-vars
        for (const [index, item] of extra.entries()) {
          if (!React.isValidElement(item)) {
            continue;
          }

          extraActions.push(item);

          return extra;
        }
      } else {
        if (React.isValidElement(extra)) {
          return extra;
        }

        return null;
      }
    }

    if (extraActions.length > 0) {
      if (isArray(extra)) {
        for (const item of extra) {
          if (!React.isValidElement(item)) {
            continue;
          }

          extraActions.push(item);
        }
      } else {
        if (React.isValidElement(extra)) {
          extraActions.push(extra);
        }
      }
    }

    return (
      <Space>
        {extraActions.map((item, index) => {
          return <Fragment key={`action_index_${index}`}>{item}</Fragment>;
        })}
      </Space>
    );
  };

  renderOverlayContent = () => {
    const { overlayContent } = this.getProperties();

    if (overlayContent == null) {
      return null;
    }

    const { overlayVisible } = this.state;

    return (
      <Overlay visible={overlayVisible} color="#000000" alpha={0.7}>
        {overlayContent}
      </Overlay>
    );
  };

  render() {
    const { flag, switchControl, children, icon, destroyOnClose, ...rest } =
      this.getProperties();

    const v = !!switchControl[flag];

    const styleCollection = this.buildStyles();
    const extra = this.renderExtra();

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
      <Drawer
        open={v || false}
        destroyOnClose={destroyOnClose || false}
        {...rest}
        styles={styleCollection}
        title={textComponentWrapper}
        extra={extra}
      >
        {children}

        {this.renderOverlayContent()}
      </Drawer>
    );
  }
}

export { DrawerExtra };
