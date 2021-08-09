import { history, Link } from 'umi';

export const proLayoutDefaultProps = {
  onMenuHeaderClick: () => history.push('/'),
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

    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
  },
  itemRender: (route, params, routes, paths) => {
    const first = routes.indexOf(route) === 0;

    return first ? (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  },
};
