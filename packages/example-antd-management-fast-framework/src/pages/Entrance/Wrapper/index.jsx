import React from 'react';
import { Helmet, HelmetProvider } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

import { ComponentBase } from 'antd-management-fast-common/es/customComponents';
import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';
import { Bubbly } from 'antd-management-fast-component/es/customComponents/Canvas';
import FlexBox from 'antd-management-fast-component/es/customComponents/FlexBox';
import VerticalBox from 'antd-management-fast-component/es/customComponents/VerticalBox';

import { defaultSettings } from '../../../defaultSettings';

const defaultProps = {};

class Wrapper extends ComponentBase {
  renderFurther() {
    const { children } = this.props;

    const title = '登录';

    return (
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

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
              copyright={defaultSettings.getCopyright() || ''}
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
      </HelmetProvider>
    );
  }
}

Wrapper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Wrapper;
