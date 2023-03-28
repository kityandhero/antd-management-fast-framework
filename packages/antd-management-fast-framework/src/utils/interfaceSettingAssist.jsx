import { Dropdown } from 'antd';
import nprogress from 'nprogress';
import React, { Fragment } from 'react';
import { SettingDrawer } from '@ant-design/pro-layout';
import { Link } from '@umijs/max';

import {
  checkObjectIsNullOrEmpty,
  checkStringIsNullOrWhiteSpace,
  isEmptyObject,
  isFunction,
  logExecute,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  defaultUserAvatar,
  getApplicationListData,
  getLeftBarLogo,
  getLeftBarText,
  getUseNprogress,
} from 'antd-management-fast-common';
import {
  AnchorLink,
  Footer,
  iconBuilder,
} from 'antd-management-fast-component';

import { Bootstrap } from '../components';

import { signOutAction } from './entranceAssist';
import {
  getInterfaceSetting,
  setInterfaceSetting,
} from './interfaceSettingCacheAssist';

export function getLayoutSetting({
  logo = '',
  title = '',
  water = '',
  footerLinks = [],
  initialState,
  setInitialState,
  themeToken = {},
  avatarMenuItems = [],
  actionItems = [],
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

  return {
    ...settings,
    disableContentMargin: false,
    logo: getLeftBarLogo(logo),
    title: checkStringIsNullOrWhiteSpace(title) ? getLeftBarText() : title,
    menu: {},
    siderMenuType: 'group',
    waterMarkProps: checkStringIsNullOrWhiteSpace(title)
      ? {}
      : {
          content: water,
        },
    appList: getApplicationListData(),
    avatarProps: layoutAvatarAdjust,
    contentStyle: {
      padding: '0',
    },
    headerTitleRender: (logo, title, _) => {
      const defaultDom = (
        <AnchorLink>
          {logo}
          {title}
        </AnchorLink>
      );

      if (document.body.clientWidth < 1400) {
        return defaultDom;
      }

      if (_.isMobile) return defaultDom;

      return <>{defaultDom}</>;
    },
    itemRender: (route) => route.breadcrumbName,
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
    // eslint-disable-next-line no-unused-vars
    menuFooterRender: (properties) => null,
    ...(checkObjectIsNullOrEmpty(themeToken) ? {} : { token: themeToken }),
    ...config,
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
                  let { settings: preSettings = {} } = {
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
