import React, { PureComponent } from 'react';

const defaultProperties = {
  top: null,
  body: null,
  bottom: null,
};

class BodyContent extends PureComponent {
  render() {
    const { top, body, bottom } = {
      ...defaultProperties,
      ...this.props,
    };

    if (body == null && bottom == null) {
      return null;
    }

    return (
      <div
        style={{
          padding: '12px 16px',
        }}
      >
        {top}

        {body}

        {bottom}
      </div>
    );
  }
}

export { BodyContent };
