import nprogress from 'nprogress';
import React from 'react';
import { SettingDrawer } from '@ant-design/pro-layout';
import { Link } from '@umijs/max';

import {
  checkStringIsNullOrWhiteSpace,
  isEmptyObject,
  logExecute,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  getApplicationListData,
  getLeftBarLogo,
  getLeftBarText,
  getUseNprogress,
} from 'antd-management-fast-common';
import { AnchorLink, Footer } from 'antd-management-fast-component';

import { Bootstrap } from '../components';

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
  config,
}) {
  logExecute('getLayoutSetting');

  let { settings = {} } = {
    settings: {},
    ...initialState,
  };

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
    ...config,
    childrenRender: (children, properties) => {
      return (
        <>
          {children}

          <Bootstrap />

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

                  return v;
                });
              }}
            />
          )}
        </>
      );
    },
  };
}
