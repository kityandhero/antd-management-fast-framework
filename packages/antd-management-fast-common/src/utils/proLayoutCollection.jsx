import nprogress from 'nprogress';
import { Link } from 'umi';

import { runtimeSettings } from './dynamicSetting';
import { showErrorMessage } from './tools';

/**
 * layout默认配置
 */
export const proLayoutDefaultProps = {
  onMenuHeaderClick: () => {},
  itemRender: (route, params, routes, paths) => {
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
          if (runtimeSettings.getUseNprogress()) {
            if ((nprogress || null) == null) {
              const text = 'nprogress need install';

              showErrorMessage({
                message: text,
              });
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
