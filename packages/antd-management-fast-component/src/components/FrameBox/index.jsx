import React, { PureComponent } from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

class FrameBox extends PureComponent {
  frameRef = React.createRef();

  render() {
    const {
      width,
      height,
      border,
      url,
      onload: onloadCallback,
    } = {
      url: '',
      width: '100%',
      height: '100%',
      border: '0px',
      onload: null,
      ...this.props,
    };

    if (checkStringIsNullOrWhiteSpace(url)) {
      showSimpleErrorMessage(
        'url in FrameBox properties disallow null or empty',
      );
    }

    return (
      <iframe
        ref={this.frameRef}
        style={{
          width,
          height,
          border,
        }}
        onLoad={() => {
          if (!isFunction(onloadCallback)) {
            return;
          }

          onloadCallback(document, this.frameRef);
        }}
        src={url}
      />
    );
  }
}

export { FrameBox };
