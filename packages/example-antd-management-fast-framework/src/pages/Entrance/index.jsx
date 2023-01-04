import React, { PureComponent } from 'react';

import SignIn from './SignIn';
import Wrapper from './Wrapper';

const defaultProps = {};

class Entrance extends PureComponent {
  render() {
    console.log(this.props);

    return (
      <Wrapper>
        <SignIn />
      </Wrapper>
    );
  }
}

Entrance.defaultProps = {
  // ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Entrance;
