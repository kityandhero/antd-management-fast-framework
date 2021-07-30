import React from 'react';
import { connect, Redirect } from 'umi';
import { pathToRegexp } from 'path-to-regexp';
import Authorized from '../../lib/utils/Authorized';
import { getToken } from '../../lib/utils/tools';

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
      noMatch={
        isLogin ? (
          <Redirect to="/exception/403" />
        ) : (
          <Redirect to="/user/login" />
        )
      }
    >
      {children}
    </Authorized>
  );
};

export default connect(({ global, operator }) => ({
  global,
  operator,
}))(AuthComponent);
