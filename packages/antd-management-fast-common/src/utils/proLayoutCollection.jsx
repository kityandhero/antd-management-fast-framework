import nprogress from 'nprogress';
import { Link } from 'umi';

import { runtimeSettings } from './dynamicSetting';
import { goToPath, showErrorMessage } from './tools';

/**
 * layout默认配置
 */
export const proLayoutDefaultProps = {
  onMenuHeaderClick: () => goToPath('/'),
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
