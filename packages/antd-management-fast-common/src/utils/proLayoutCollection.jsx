import nprogress from 'nprogress';
import { Link } from '@umijs/max';

import { showSimpleErrorMessage } from 'easy-soft-utility';

import { getUseNprogress } from './settingAssist';

/**
 * layout默认配置
 */
export const proLayoutDefaultProperties = {
  onMenuHeaderClick: () => {},
  itemRender: (route, parameters, routes, paths) => {
    const first = routes.indexOf(route) === 0;

    return first ? (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  },
  menuItemRender: (item, dom) => {
    const { children: childrenArray } = item.children || {
      children: [],
    };

    if (item.isUrl || (childrenArray || []).length > 0 || !item.path) {
      return dom;
    }

    return (
      <Link
        to={item.path}
        onClick={() => {
          if (getUseNprogress()) {
            if ((nprogress || null) == null) {
              const text = 'nprogress need install';

              showSimpleErrorMessage(text);
            }

            nprogress.inc();

            setTimeout(() => {
              nprogress.done();
            }, 400);
          }
        }}
      >
        {dom}
      </Link>
    );
  },
};
