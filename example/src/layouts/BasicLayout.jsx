import React, { useEffect } from 'react';
import { Link, connect, FormattedMessage } from 'umi';
import { Result, Button } from 'antd';
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';

import { getQueue, checkDevelopment } from 'antd-management-fast-framework/lib/utils/tools';
import { proLayoutDefaultProps } from 'antd-management-fast-framework/lib/utils/constants';
import { setAccessWayCollectionCache } from 'antd-management-fast-framework/lib/utils/globalStorageAssist';
import {
  isAntDesignPro,
  getAuthorityFromRouter,
} from 'antd-management-fast-framework/lib/utils/utils';
import Authorized from 'antd-management-fast-framework/lib/utils/Authorized';

import { accessWayCollection } from '@/customConfig/config';
import RightContent from '@/components/GlobalHeader/RightContent';
import { execBasicLayoutRemoteRequest } from '@/customConfig/customLoad';
import { defaultFooterData, menuHeaderRender } from '@/customSpecialComponents/CustomAssembly';
import { formatMessage } from '@/utils/tools';
import { defaultSettings } from '@/defaultSettings';

const loginPath = defaultSettings.getLoginPath();

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to={loginPath}>Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };

    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter copyright={defaultFooterData.copyright} links={defaultFooterData.links} />
);

const footerRender = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    global,
    // setSetting
  } = props;

  useEffect(() => {
    if (dispatch) {
      setAccessWayCollectionCache(accessWayCollection);
      execBasicLayoutRemoteRequest(dispatch);

      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, [dispatch]);

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  getQueue();

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const { currentOperator } = global || {
    currentOperator: { platform: { logo: '' } },
  };

  const { platform } = currentOperator || { platform: { logo: '' } };

  const { logo } = platform || { logo: '' };

  return (
    <>
      <ProLayout
        logo={defaultSettings.getLeftBarLogo(logo)}
        formatMessage={(o) => {
          return <FormattedMessage {...o} />;
        }}
        {...proLayoutDefaultProps}
        menuHeaderRender={(logoDom) => {
          return menuHeaderRender(logoDom, props);
        }}
        onCollapse={handleMenuCollapse}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({ id: 'menu.home' }),
          },
          ...routers,
        ]}
        menuItemRender={(menuItemProps, defaultDom) => {
          const { children: childrenArray } = menuItemProps.children || {
            children: [],
          };

          if (menuItemProps.isUrl || (childrenArray || []).length > 0 || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        // waterMarkProps={{
        //   content: 'Pandora',
        //   fontColor: 'rgba(24,144,255,0.15)',
        // }}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      {checkDevelopment() ? (
        <SettingDrawer
          settings={settings}
          disableUrlParams={true}
          onSettingChange={(config) => {
            dispatch({
              type: 'settings/changeSetting',
              payload: config,
            });
          }}
        />
      ) : null}
    </>
  );
};

export default connect(({ currentOperator, global, settings }) => ({
  collapsed: global.collapsed,
  settings,
  currentOperator,
  global,
}))(BasicLayout);
