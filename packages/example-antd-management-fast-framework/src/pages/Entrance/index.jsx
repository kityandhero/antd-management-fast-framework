import React, { PureComponent } from 'react';

import Container from './Container';
import SignIn from './SignIn';

const defaultProps = {};

class Entrance extends PureComponent {
  render() {
    console.log(this.props);

    return (
      <Container>
        <SignIn />
      </Container>
    );
  }
}

Entrance.defaultProps = {
  // ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Entrance;
