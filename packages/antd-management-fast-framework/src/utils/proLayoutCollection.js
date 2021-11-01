import React from 'react';
import { history, Link } from 'umi';
import nprogress from 'nprogress';

export const proLayoutDefaultProps = {
  onMenuHeaderClick: () => history.push('/'),
  itemRender: (route, params, routes, paths) => {
    const first = routes.indexOf(route) === 0;

    return first ? (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  },
  menuItemRender: (menuItemProps, defaultDom) => {
    const { children: childrenArray } = menuItemProps.children || {
      children: [],
    };

    if (
      menuItemProps.isUrl ||
      (childrenArray || []).length > 0 ||
      !menuItemProps.path
    ) {
      return defaultDom;
    }

    return (
      <Link
        to={menuItemProps.path}
        onClick={() => {
          nprogress.inc();

          setTimeout(() => {
            nprogress.done();
          }, 200);
        }}
      >
        {defaultDom}
      </Link>
    );
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
