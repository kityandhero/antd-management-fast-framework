import React from 'react';
import { ToastContainer } from 'react-toastify';

import { ApplicationProvider } from 'easy-soft-dva';

import { BaseComponent } from 'antd-management-fast-component';

import { TopProgressBar } from '../TopProgressBar';

class ApplicationWrapper extends BaseComponent {
  renderFurther() {
    return (
      <ApplicationProvider>
        <TopProgressBar />

        <div className="antd-management-fast">{this.props.children}</div>

        <ToastContainer />
      </ApplicationProvider>
    );
  }
}

ApplicationWrapper.defaultProps = {};

export { ApplicationWrapper };
