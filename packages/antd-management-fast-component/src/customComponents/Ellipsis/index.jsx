import { Tooltip } from 'antd';
import React, { Component } from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */

const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

const TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
};

const getStringFullLength = (v = '') =>
  // eslint-disable-next-line unicorn/prefer-spread, unicorn/no-array-reduce
  v.split('').reduce((pre, current) => {
    const charCode = current.codePointAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

const cutStringByFullLength = (v = '', maxLength) => {
  let showLength = 0;

  // eslint-disable-next-line unicorn/prefer-spread, unicorn/no-array-reduce
  return v.split('').reduce((pre, current) => {
    const charCode = current.codePointAt(0);
    showLength += charCode >= 0 && charCode <= 128 ? 1 : 2;
    if (showLength <= maxLength) {
      return pre + current;
    }
    return pre;
  }, '');
};

const getTooltip = ({ tooltip, overlayStyle, title, color, children }) => {
  if (tooltip) {
    const properties =
      tooltip === true
        ? { overlayStyle, title, color }
        : { ...tooltip, overlayStyle, title, color };
    return <Tooltip {...properties}>{children}</Tooltip>;
  }
  return children;
};

const EllipsisText = ({
  text,
  length,
  tooltip,
  fullWidthRecognition,
  ...other
}) => {
  if (typeof text !== 'string') {
    throw new TypeError('Ellipsis children must be string.');
  }
  const textLength = fullWidthRecognition
    ? getStringFullLength(text)
    : text.length;
  if (textLength <= length || length < 0) {
    return <span {...other}>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition
      ? cutStringByFullLength(text, length)
      : text.slice(0, length);
  }

  const spanAttributes = tooltip ? {} : { ...other };
  return getTooltip({
    tooltip,
    overlayStyle: TooltipOverlayStyle,
    title: text,
    children: (
      <span {...spanAttributes}>
        {displayText}
        {tail}
      </span>
    ),
  });
};

class Ellipsis extends Component {
  state = {
    text: '',
    targetCount: 0,
  };

  componentDidMount() {
    if (this.node) {
      this.computeLine();
    }
  }

  componentDidUpdate(perProperties) {
    const { lines } = this.props;
    if (lines !== perProperties.lines) {
      this.computeLine();
    }
  }

  computeLine = () => {
    const { lines } = this.props;
    if (lines && !isSupportLineClamp) {
      const text =
        // eslint-disable-next-line unicorn/prefer-dom-node-text-content
        this.shadowChildren.innerText || this.shadowChildren.textContent;
      const lineHeight = Number.parseInt(
        getComputedStyle(this.root).lineHeight,
        10,
      );
      const targetHeight = lines * lineHeight;
      this.content.style.height = `${targetHeight}px`;
      const totalHeight = this.shadowChildren.offsetHeight;
      const shadowNode = this.shadow.firstChild;

      if (totalHeight <= targetHeight) {
        this.setState({
          text,
          targetCount: text.length,
        });
        return;
      }

      // bisection
      const length_ = text.length;
      const mid = Math.ceil(length_ / 2);

      const count = this.bisection(
        targetHeight,
        mid,
        0,
        length_,
        text,
        shadowNode,
      );

      this.setState({
        text,
        targetCount: count,
      });
    }
  };

  // eslint-disable-next-line unicorn/prevent-abbreviations
  bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.slice(0, Math.max(0, mid)) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      shadowNode.innerHTML = text.slice(0, Math.max(0, mid + 1)) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      mid =
        end - begin === 1 ? 1 + begin : Math.floor((end - begin) / 2) + begin;
      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.slice(0, Math.max(0, mid - 1)) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return this.bisection(th, mid, begin, end, text, shadowNode);
  };

  handleRoot = (n) => {
    this.root = n;
  };

  handleContent = (n) => {
    this.content = n;
  };

  handleNode = (n) => {
    this.node = n;
  };

  handleShadow = (n) => {
    this.shadow = n;
  };

  handleShadowChildren = (n) => {
    this.shadowChildren = n;
  };

  render() {
    const { text, targetCount } = this.state;
    const {
      children,
      lines,
      length,
      tooltip,
      fullWidthRecognition,
      title,
      color,
      ...restProperties
    } = this.props;

    const mainStyle = {
      display: 'inline-block',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'normal',
      wordBreak: 'break-all',
      ...(lines
        ? isSupportLineClamp
          ? {
              position: 'relative',
              display: 'flex',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              lineClamp: lines,
            }
          : { position: 'relative' }
        : {}),
    };

    const shadowStyle = {
      position: 'absolute',
      zIndex: '-999',
      display: 'block',
      color: 'transparent',
      opacity: 0,
    };

    if (!lines && !length) {
      return (
        <span style={mainStyle} {...restProperties}>
          {children}
        </span>
      );
    }

    // length
    if (!lines) {
      return (
        <EllipsisText
          style={mainStyle}
          length={length}
          text={children || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
          {...restProperties}
        />
      );
    }

    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const node = (
        <div style={mainStyle} {...restProperties}>
          {children}
        </div>
      );

      return getTooltip({
        tooltip,
        overlayStyle: TooltipOverlayStyle,
        title: title || children,
        children: node,
        ...(checkStringIsNullOrWhiteSpace(color) ? {} : { color }),
      });
    }

    const childNode = (
      <span ref={this.handleNode}>
        {targetCount > 0 && text.slice(0, Math.max(0, targetCount))}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    );

    return (
      <div {...restProperties} ref={this.handleRoot} style={mainStyle}>
        <div ref={this.handleContent}>
          {getTooltip({
            tooltip,
            overlayStyle: TooltipOverlayStyle,
            title: text,
            children: childNode,
          })}

          <div ref={this.handleShadowChildren} style={shadowStyle}>
            {children}
          </div>

          <div ref={this.handleShadow} style={shadowStyle}>
            <span>{text}</span>
          </div>
        </div>
      </div>
    );
  }
}

export { Ellipsis };
