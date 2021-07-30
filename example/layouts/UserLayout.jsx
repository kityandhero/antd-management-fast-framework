import React from 'react';
import { connect, Link } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  DefaultFooter,
  getMenuData,
  getPageTitle,
} from '@ant-design/pro-layout';

import { formatMessage } from '../../lib/utils/tools';
import { appInitCustom } from '../../lib/utils/constants';
import { defaultSettings } from '@/defaultSettings';
import { showLogoInLoginView } from '../customConfig/config';
import VerticalBox from '../../lib/customComponents/VerticalBox';
import FlexBox from '../../lib/customComponents/FlexBox';
import Bubbly from '../../lib/customComponents/Canvas/Bubbly';

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
                      {appInitCustom == null
                        ? '未设置名称'
                        : appInitCustom.appName || '未设置名称'}
                    </span>
                  </Link>
                </div>
                <div className={styles.desc}>
                  {appInitCustom == null
                    ? ''
                    : appInitCustom.appDescription || ''}
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
            copyright={
              appInitCustom == null ? '' : appInitCustom.copyright || ''
            }
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
