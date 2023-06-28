import React, { PureComponent } from 'react';

class BodyContent extends PureComponent {
  render() {
    const { body, bottom } = this.props;

    if (body == null && bottom == null) {
      return null;
    }

    return (
      <div
        style={{
          padding: '12px 16px',
        }}
      >
        {body}

        {bottom}
      </div>
    );
  }
}

BodyContent.defaultProps = {
  body: null,
  bottom: null,
};

export { BodyContent };
