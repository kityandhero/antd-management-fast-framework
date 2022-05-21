import { PureComponent } from 'react';

import VerticalBox from '../VerticalBox';

class CenterBox extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <VerticalBox
        style={{
          height: '100%',
          width: '100%',
        }}
        align="center"
        alignJustify="center"
      >
        {children}
      </VerticalBox>
    );
  }
}

export default CenterBox;
