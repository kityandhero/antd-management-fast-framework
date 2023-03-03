import React from 'react';

import { BaseComponent } from '../../BaseComponent';

class BodyContent extends BaseComponent {
  renderFurther() {
    const { body, bottom } = this.props;

    return (
      <div
        style={{
          padding: '20px 24px',
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
