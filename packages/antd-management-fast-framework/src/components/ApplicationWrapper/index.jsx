import { App, ConfigProvider } from 'antd';
import React, { PureComponent } from 'react';

import { ApplicationProvider } from 'easy-soft-dva';
import { logTrace } from 'easy-soft-utility';

import { InteractionAssemble } from 'antd-management-fast-common';

// import { BaseComponent } from 'antd-management-fast-component';
import { TopProgressBar } from '../TopProgressBar';

class ApplicationWrapper extends PureComponent {
  render() {
    logTrace(
      '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
    );

    return (
      <ApplicationProvider>
        <ConfigProvider>
          <App>
            <InteractionAssemble />

            <div className="antd-management-fast">{this.props.children}</div>
          </App>
        </ConfigProvider>

        <TopProgressBar />
      </ApplicationProvider>
    );
  }
}

ApplicationWrapper.defaultProps = {};

export { ApplicationWrapper };
