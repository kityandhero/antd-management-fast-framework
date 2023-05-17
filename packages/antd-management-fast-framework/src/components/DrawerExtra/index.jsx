import { Button, Drawer, Space } from 'antd';
import React, { Fragment, PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace, isArray } from 'easy-soft-utility';

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
    const { titlePrefix, title, subtitle } = this.props;

    const subtitleAdjust = checkStringIsNullOrWhiteSpace(subtitle)
      ? ''
      : `:【${subtitle}】`;

    return `${titlePrefix}${title || '标题'}${subtitleAdjust}`;
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

  renderExtra = () => {
    const { extra } = this.props;

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
    const { overlayContent } = this.props;

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
    const { flag, switchControl, children, icon, bodyStyle, ...rest } =
      this.props;

    const v = !!switchControl[flag];

    const extra = this.renderExtra();

    return (
      <Drawer
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
        extra={extra}
      >
        {children}

        {this.renderOverlayContent()}
      </Drawer>
    );
  }
}

DrawerExtra.defaultProps = {
  icon: null,
  titlePrefix: null,
  title: null,
  subtitle: null,
  overlayContent: null,
  overlayButtonOpenText: '打开浮层',
  overlayButtonCloseText: '关闭浮层',
};

export { DrawerExtra };
