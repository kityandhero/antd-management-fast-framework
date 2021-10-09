import React from 'react';
import { connect, Redirect } from 'umi';
import { pathToRegexp } from 'path-to-regexp';
import Authorized from 'antd-management-fast-framework/es/utils/Authorized';
import { getToken } from 'antd-management-fast-framework/es/utils/globalStorageAssist';

import { defaultSettings } from '@/defaultSettings';

const loginPath = defaultSettings.getLoginPath();

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
}) => {
  const { routes = [] } = route;
  const isLogin = (getToken() || '') !== '';

  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to={loginPath} />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ global, currentOperator }) => ({
  global,
  currentOperator,
}))(AuthComponent);
