import { pathToRegexp } from 'path-to-regexp';
import { connect, Redirect } from 'umi';

import Authorized from 'antd-management-fast-common/es/utils/Authorized';
import { getToken } from 'antd-management-fast-common/es/utils/globalStorageAssist';

import { defaultSettings } from '@/defaultSettings';

const entrancePath = defaultSettings.getEntrancePath();

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
  const hasOperator = (getToken() || '') !== '';

  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={
        hasOperator ? (
          <Redirect to="/exception/403" />
        ) : (
          <Redirect to={entrancePath} />
        )
      }
    >
      {children}
    </Authorized>
  );
};

export default connect(({ global, currentOperator }) => ({
  global,
  currentOperator,
}))(AuthComponent);
