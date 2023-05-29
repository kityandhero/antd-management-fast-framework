import { Dropdown } from 'antd';
import React, { Fragment } from 'react';
import { SettingDrawer } from '@ant-design/pro-layout';

import {
  checkHasAuthority,
  checkObjectIsNullOrEmpty,
  checkStringIsNullOrWhiteSpace,
  endsWith,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  logExecute,
  logTrace,
  redirectTo,
  toNumber,
} from 'easy-soft-utility';

import {
  defaultUserAvatar,
  getApplicationListData,
  getAuthorizationFailRedirectPath,
  getCurrentRoute,
  getLeftBarLogo,
  getLeftBarText,
  layoutCollection,
} from 'antd-management-fast-common';
import {
  AnchorLink,
  Footer,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import { Bootstrap } from '../components';

import { signOutAction } from './entranceAssist';
import {
  getInterfaceSetting,
  setInterfaceSetting,
} from './interfaceSettingCacheAssist';
import {
  getLocalInterfaceSetting,
  setLocalInterfaceSetting,
} from './interfaceSettingLocalAssist';

/**
 * merge layout runtime config
 * @param {Object} options
 * @param {string} options.logo logo
 * @param {string} options.title title
 * @param {water} options.water water
 * @param {Array} options.footerLinks footerLinks
 * @param {Object} options.initialState initialState
 * @param {Function} options.setInitialState initialState setter
 * @param {Object} options.themeToken theme token
 * @param {Array} options.avatarMenuItems avatar menu items in dropdown
 * @param {Array} options.actionItems action items in header
 * @param {null|Object} options.menuFooter menu footer, it only take effect on collapsed
 * @param {null|Object} options.miniMenu header mini card menu
 * @param {Array} options.backgroundImageItems layout background image items
 * @param {boolean} options.keepCollapsed memory collapsed statue and use this status when reopen, default is false
 * @param {boolean} options.groupMenu take menu to group type, default is false
 * @param {boolean} options.collapsedShowTitle show title when collapsed, it will trigger more render
 * @param {Object} options.config other layout config
 */
export function mergeLayoutSetting({
  logo = '',
  title = '',
  water = '',
  footerLinks = [],
  initialState,
  setInitialState,
  themeToken = {},
  avatarMenuItems = [],
  actionItems = [],
  menuExtra = null,
  menuFooter = null,
  miniMenu = null,
  backgroundImageItems = [],
  keepCollapsed = false,
  groupMenu = false,
  collapsedShowTitle = false,
  config,
}) {
  logExecute('getLayoutSetting');

  let { settings = {}, layoutAvatar = {} } = {
    settings: {},
    layoutAvatar: {},
    ...initialState,
  };

  const avatarMenuItemsAdjust = [
    ...avatarMenuItems,
    {
      key: 'logout',
      icon: iconBuilder.logout(),
      label: '退出登录',
      onClick: () => {
        signOutAction({});
      },
    },
  ];

  const layoutAvatarAdjust = {
    src: defaultUserAvatar,
    title: 'nickname',
    ...layoutAvatar,
    size: 'small',
    render: (properties, dom) => {
      return (
        <Dropdown
          menu={{
            items: avatarMenuItemsAdjust,
          }}
        >
          {dom}
        </Dropdown>
      );
    },
  };

  if (checkStringIsNullOrWhiteSpace(layoutAvatar.src)) {
    layoutAvatar.src = defaultUserAvatar;
  }

  if (isEmptyObject(settings)) {
    settings = getInterfaceSetting();
  }

  const { collapsed } = {
    collapsed: false,
    ...getLocalInterfaceSetting(),
  };

  const keepCollapsedSetting = {};

  if (keepCollapsed) {
    keepCollapsedSetting.breakpoint = false;
    keepCollapsedSetting.defaultCollapsed = collapsed;
  }

  const { layout: layoutCurrentValue } = settings;

  return {
    ...settings,
    disableContentMargin: false,
    logo: getLeftBarLogo(logo),
    title: checkStringIsNullOrWhiteSpace(title) ? getLeftBarText() : title,
    menu: {
      ...(collapsed ? {} : groupMenu ? { type: 'group' } : {}),
      ...(collapsed ? { collapsedShowTitle: collapsedShowTitle } : {}),
    },
    menuProps: {},
    waterMarkProps: checkStringIsNullOrWhiteSpace(title)
      ? {}
      : {
          content: water,
        },
    appList: getApplicationListData(),
    bgLayoutImgList: backgroundImageItems,
    avatarProps: layoutAvatarAdjust,
    contentStyle: {
      padding: '0',
    },
    headerTitleRender: (logo, title, _) => {
      const defaultDom = (
        <AnchorLink>
          {logo}

          <VerticalBox
            className="amf-header-logo-title-box"
            style={{
              marginLeft: '6px',
            }}
          >
            {title}
          </VerticalBox>
        </AnchorLink>
      );

      if (document.body.clientWidth < 1400) {
        return defaultDom;
      }

      if (_.isMobile) return defaultDom;

      if (!miniMenu) return defaultDom;

      return (
        <>
          {defaultDom}

          {miniMenu}
        </>
      );
    },
    itemRender: (route) => route.breadcrumbName,
    postMenuData: (d) => {
      if (!collapsedShowTitle) {
        return d;
      }

      if (collapsed) {
        for (const o of d) {
          if (
            layoutCurrentValue === layoutCollection.mix &&
            o.parentId === 'ant-design-pro-layout'
          ) {
            continue;
          }

          if (!endsWith(o.locale, '-mini')) {
            o.locale = `${o.locale}-mini`;
          }
        }
      }

      return d;
    },
    menuExtraRender: ({ collapsed }) => {
      if (collapsed || (menuExtra || null) == null) {
        return null;
      }

      return menuExtra;
    },
    menuFooterRender: (properties) => {
      if (properties?.collapsed) return;

      return menuFooter;
    },
    footerRender: () => <Footer links={footerLinks} />,
    logout: null,
    rightContentRender: false,
    actionsRender: (properties) => {
      if (properties.isMobile) return [];

      const actionItemsAdjust = actionItems.map((o, index) => {
        let item = null;

        const { layout } = properties;

        item = isFunction(o) ? o({ layout }) : o;

        if ((item || null) == null) {
          return null;
        }

        return <Fragment key={`actionItems_${index}`}>{item}</Fragment>;
      });

      return [...actionItemsAdjust];
    },
    ...(checkObjectIsNullOrEmpty(themeToken) ? {} : { token: themeToken }),
    ...config,
    ...keepCollapsedSetting,
    onCollapse: (collapsed) => {
      if (!keepCollapsed) {
        return;
      }

      const v = {
        ...getLocalInterfaceSetting(),
        collapsed: collapsed || false,
      };

      setLocalInterfaceSetting(v);

      if (!collapsedShowTitle) {
        return;
      }

      setInitialState((preInitialState) => {
        const { updateCount: preUpdateCount = {} } = {
          updateCount: 0,
          ...preInitialState,
        };

        return {
          ...preInitialState,
          updateCount: toNumber(preUpdateCount) + 1,
        };
      });
    },
    onPageChange: (o) => {
      console.log('-------------------------------');
      console.log(o);

      const { authority } = {
        authority: '',
        ...getCurrentRoute(),
      };

      if (checkStringIsNullOrWhiteSpace(authority) || isEmptyArray(authority)) {
        return;
      }

      const checkResult = checkHasAuthority(authority);

      if (!checkResult) {
        logTrace(
          { authority },
          'check authority fail, redirect to AuthorizationFailRedirectPath',
        );

        const path = getAuthorizationFailRedirectPath();

        redirectTo(path);
      }
    },
    childrenRender: (children, properties) => {
      return (
        <>
          {children}

          <Bootstrap setInitialState={setInitialState} />

          {!properties.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => {
                  const { settings: preSettings = {} } = {
                    settings: {},
                    ...preInitialState,
                  };

                  const v = {
                    ...preSettings,
                    ...settings,
                  };

                  setInterfaceSetting(v);

                  return {
                    ...preInitialState,
                    settings: v,
                  };
                });
              }}
            />
          )}
        </>
      );
    },
  };
}
