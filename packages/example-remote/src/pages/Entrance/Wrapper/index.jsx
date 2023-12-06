import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import { Helmet } from '@umijs/max';

import { getCopyright } from 'antd-management-fast-common';
import {
  BaseComponent,
  Bubbly,
  FlexBox,
  VerticalBox,
} from 'antd-management-fast-component';

const defaultProps = {};

class Wrapper extends BaseComponent {
  renderFurther() {
    const { children } = this.props;

    const title = '登录';

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div style={{ height: '100vh' }}>
          <FlexBox
            flexAuto="top"
            vertical={{
              bottomHeight: '180rpx',
            }}
            top={
              <VerticalBox
                align="center"
                alignJustify="center"
                style={{
                  height: '100%',
                }}
              >
                <div
                  style={{
                    flex: '1',
                    padding: '32px 0',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>{children}</div>
                </div>
              </VerticalBox>
            }
            bottom={
              <DefaultFooter
                style={{ background: 'inherit' }}
                links={[]}
                copyright={getCopyright() || ''}
              />
            }
          />

          <div
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%',
              top: 0,
              zIndex: -1,
            }}
          >
            <Bubbly />
          </div>
        </div>
      </>
    );
  }
}

Wrapper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Wrapper;
