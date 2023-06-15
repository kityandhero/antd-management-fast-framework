import { App, ConfigProvider } from 'antd';
import React, { PureComponent } from 'react';

import { ApplicationProvider } from 'easy-soft-dva';
import { logDebug } from 'easy-soft-utility';

import { InteractionAssemble } from 'antd-management-fast-common';

import { TopProgressBar } from '../TopProgressBar';

class ApplicationWrapper extends PureComponent {
  render() {
    logDebug('render ApplicationWrapper');

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
