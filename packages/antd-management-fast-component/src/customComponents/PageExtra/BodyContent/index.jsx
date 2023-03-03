import React from 'react';

import { BaseComponent } from '../../BaseComponent';

class BodyContent extends BaseComponent {
  renderFurther() {
    const { body, bottom } = this.props;

    return (
      <div
        style={{
          padding: '14px 16px',
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
