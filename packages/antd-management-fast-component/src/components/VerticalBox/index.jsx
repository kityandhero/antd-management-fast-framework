import classNames from 'classnames';
import React, { PureComponent } from 'react';

import { isFunction } from 'easy-soft-utility';

class VerticalBox extends PureComponent {
  triggerClick = (event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  render() {
    const {
      className,
      style,
      fillWidth,
      bodyStyle,
      align,
      alignJustify,
      children,
    } = this.props;

    let alignStyle = 'center';

    switch (align) {
      case 'top': {
        alignStyle = 'flex-start';
        break;
      }

      case 'center': {
        alignStyle = 'center';
        break;
      }

      case 'bottom': {
        alignStyle = 'flex-end';
        break;
      }

      default: {
        alignStyle = 'center';
        break;
      }
    }

    let alignJustifyStyle = 'flex-start';

    switch (alignJustify) {
      case 'start': {
        alignJustifyStyle = 'flex-start';
        break;
      }

      case 'center': {
        alignJustifyStyle = 'center';
        break;
      }

      case 'end': {
        alignJustifyStyle = 'flex-end';
        break;
      }

      case 'between': {
        alignJustifyStyle = 'space-between';
        break;
      }

      case 'around': {
        alignJustifyStyle = 'space-around';
        break;
      }

      default: {
        alignJustifyStyle = 'flex-start';
        break;
      }
    }

    const flexStyle = {
      ...bodyStyle,
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: alignStyle,
      justifyContent: alignJustifyStyle,
    };

    return (
      <div
        style={{
          ...style,
          height: '100%',
          ...(fillWidth
            ? {
                width: '100%',
              }
            : {}),
        }}
        className={classNames('amf-vertical-box', className)}
        onClick={this.triggerClick}
      >
        <div style={flexStyle}>{children}</div>
      </div>
    );
  }
}

VerticalBox.defaultProps = {
  style: {},
  bodyStyle: {},
  align: 'center',
  alignJustify: 'flex-start',
  fillWidth: true,
  onClick: null,
};

export { VerticalBox };
