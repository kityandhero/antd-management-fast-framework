import classNames from 'classnames';
import React from 'react';
import { Helmet, HelmetProvider } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

import { ComponentBase } from 'antd-management-fast-common/es/customComponents';
import { Bubbly } from 'antd-management-fast-component/es/customComponents/Canvas';
import FlexBox from 'antd-management-fast-component/es/customComponents/FlexBox';
import VerticalBox from 'antd-management-fast-component/es/customComponents/VerticalBox';

import { defaultSettings } from '../../../defaultSettings';

import './index.less';

const classPrefix = `amf-entrance`;

const defaultProps = {};

class Container extends ComponentBase {
  render() {
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
              <div className={classNames(`${classPrefix}_content`)}>
                <div className={classNames(`${classPrefix}_content_top`)}>
                  {children}
                </div>
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

Container.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Container;
