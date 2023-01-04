import React, { PureComponent } from 'react';

import Container from './Container';
import SignIn from './SignIn';

class Entrance extends PureComponent {
  render() {
    const { children } = this.props;

    console.log(children);

    return (
      <Container>
        <SignIn />
      </Container>
    );
  }
}

export default Entrance;
