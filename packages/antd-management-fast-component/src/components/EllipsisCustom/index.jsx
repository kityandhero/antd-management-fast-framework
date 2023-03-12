import { Tooltip } from 'antd';
import classNames from 'classnames';
import React, { Component } from 'react';

import styles from './index.less';

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

  if (tooltip) {
    return (
      <Tooltip overlayStyle={TooltipOverlayStyle} title={text}>
        <span>
          {displayText}
          {tail}
        </span>
      </Tooltip>
    );
  }

  return (
    <span {...other}>
      {displayText}
      {tail}
    </span>
  );
};

class EllipsisCustom extends Component {
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
      className,
      tooltip,
      fullWidthRecognition,
      removeChildren,
      extraContent,
      ...restProperties
    } = this.props;

    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: lines && !isSupportLineClamp,
      [styles.lineClamp]: lines && isSupportLineClamp,
    });

    if (!lines && !length) {
      return (
        <span className={cls} {...restProperties}>
          {children}
        </span>
      );
    }

    // length
    if (!lines) {
      return (
        <EllipsisText
          className={cls}
          length={length}
          text={children || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
          {...restProperties}
        />
      );
    }

    const id = `antd-pro-ellipsis-${`${Date.now()}${Math.floor(
      Math.random() * 100,
    )}`}`;

    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const style = `#${id}{-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`;

      const node = (
        <div id={id} className={cls} {...restProperties}>
          <style>{style}</style>
          {removeChildren ? null : children}
          {extraContent}
        </div>
      );

      return tooltip ? (
        <Tooltip
          {...tooltip}
          overlayStyle={TooltipOverlayStyle}
          title={children}
        >
          {node}
        </Tooltip>
      ) : (
        node
      );
    }

    const childNode = (
      <span ref={this.handleNode}>
        {targetCount > 0 && text.slice(0, Math.max(0, targetCount))}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    );

    return (
      <div {...restProperties} ref={this.handleRoot} className={cls}>
        <div ref={this.handleContent}>
          {tooltip ? (
            <Tooltip
              {...tooltip}
              overlayStyle={TooltipOverlayStyle}
              title={text}
            >
              {childNode}
            </Tooltip>
          ) : (
            <div>{childNode}</div>
          )}
          <div className={styles.shadow} ref={this.handleShadowChildren}>
            {children}
          </div>
          <div className={styles.shadow} ref={this.handleShadow}>
            <span>{text}</span>
          </div>
        </div>
      </div>
    );
  }
}

export { EllipsisCustom };
