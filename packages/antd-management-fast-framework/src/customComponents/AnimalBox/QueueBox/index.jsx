import React, { PureComponent } from 'react';

import QueueListBox from '../QueueListBox';

class QueueBox extends PureComponent {
  render() {
    const { show, children } = this.props;

    return (
      <QueueListBox
        show={show}
        items={[
          {
            hidden: (children || null) == null,
            builder: () => {
              return children || null;
            },
          },
        ]}
      />
    );
  }
}

QueueBox.defaultProps = {
  show: true,
};

export default QueueBox;
