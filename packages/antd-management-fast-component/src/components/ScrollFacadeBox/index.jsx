import React, { PureComponent } from 'react';

import './index.less';

class ScrollFacadeBox extends PureComponent {
  render() {
    const { style, children } = this.props;

    return (
      <div className="amf-custom-scroll" style={style}>
        {children}
      </div>
    );
  }
}

ScrollFacadeBox.defaultProps = {
  style: null,
};

export { ScrollFacadeBox };
