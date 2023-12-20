import React, { PureComponent } from 'react';

import './index.less';

class ScrollFacadeBox extends PureComponent {
  getStyle = () => {
    const { style, fill } = this.props;

    return {
      ...style,
      ...(fill ? { height: '100%' } : {}),
    };
  };

  render() {
    const { paddingTop, paddingLeft, paddingRight, paddingBottom, children } =
      this.props;

    const style = this.getStyle();

    if (
      paddingTop <= 0 &&
      paddingLeft <= 0 &&
      paddingRight <= 0 &&
      paddingBottom <= 0
    ) {
      return (
        <div className="amf-custom-scroll" style={style}>
          {children}
        </div>
      );
    }

    return (
      <div className="amf-custom-scroll" style={style}>
        {children}
      </div>
    );
  }
}

ScrollFacadeBox.defaultProps = {
  fill: false,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  style: null,
};

export { ScrollFacadeBox };
