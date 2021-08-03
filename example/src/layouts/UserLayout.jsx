import React from 'react';
import { connect, Link } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  DefaultFooter,
  getMenuData,
  getPageTitle,
} from '@ant-design/pro-layout';

import VerticalBox from '@antd-management-fast-framework/customComponents/VerticalBox';
import FlexBox from '@antd-management-fast-framework/customComponents/FlexBox';
import Bubbly from '@antd-management-fast-framework/customComponents/Canvas/Bubbly';

import { formatMessage } from '@/utils/tools';
import { showLogoInLoginView } from '@/customConfig/config';
import { defaultSettings } from '@/defaultSettings';

import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);

  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    title: defaultSettings.getTitle(),
    ...props,
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <FlexBox
        direction="vertical"
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
            <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.header}>
                  <Link to="#">
                    {showLogoInLoginView() ? (
                      <img
                        alt="logo"
                        className={styles.logo}
                        src={defaultSettings.getShareLogo()}
                      />
                    ) : null}
                    <span className={styles.title}>
                      {defaultSettings.getAppName() || '未设置名称'}
                    </span>
                  </Link>
                </div>
                <div className={styles.desc}>
                  {defaultSettings.getAppDescription() || ''}
                </div>
                {children}
              </div>
            </div>
          </VerticalBox>
        }
        bottom={
          <DefaultFooter
            style={{ background: 'inherit' }}
            links={[]}
            copyright={defaultSettings.getCopyright || ''}
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
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
