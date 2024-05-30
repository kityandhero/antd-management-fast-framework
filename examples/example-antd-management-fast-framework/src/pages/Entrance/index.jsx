import React from 'react';

import { BaseComponent } from 'antd-management-fast-component';

import SignIn from './SignIn';
import Wrapper from './Wrapper';

const defaultProps = {};

class Entrance extends BaseComponent {
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    return (
      <Wrapper>
        <SignIn />
      </Wrapper>
    );
  }
}

Entrance.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Entrance;
