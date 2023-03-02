import { Divider, FloatButton, Popover, theme } from 'antd';
import nprogress from 'nprogress';
import React from 'react';
import { SettingDrawer } from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { Link } from '@umijs/max';

import { showSimpleErrorMessage } from 'easy-soft-utility';

import { getUseNprogress } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  Bootstrap,
  getApplicationListData,
  getLayoutSetting,
} from 'antd-management-fast-framework';

import Footer from './components/Footer';
import { getLogo, getTitle } from './utils/tools';

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '24px',
          paddingTop: 8,
          height: '307px',
          borderRadius: '0 0 6px 6px',
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <List title="金融解决方案" />
              <List
                title="其他解决方案"
                style={{
                  marginBlockStart: 32,
                }}
              />
            </div>

            <div
              style={{
                width: '308px',
                borderInlineStart: '1px solid ' + token.colorBorder,
                paddingInlineStart: 16,
              }}
            >
              <div
                className={css`
                  font-size: 14px;
                  color: ${token.colorText};
                  line-height: 22px;
                `}
              >
                热门产品
              </div>
              {Array.from({ length: 3 })
                .fill(1)
                .map((name, index) => {
                  return (
                    <div
                      key={index}
                      className={css`
                        border-radius: 4px;
                        padding: 16px;
                        margin-top: 4px;
                        display: flex;
                        cursor: pointer;
                        &:hover {
                          background-color: ${token.colorBgTextHover};
                        }
                      `}
                    >
                      <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                      <div
                        style={{
                          marginInlineStart: 14,
                        }}
                      >
                        <div
                          className={css`
                            font-size: 14px;
                            color: ${token.colorText};
                            line-height: 22px;
                          `}
                        >
                          Ant Design
                        </div>
                        <div
                          className={css`
                            font-size: 12px;
                            color: ${token.colorTextSecondary};
                            line-height: 20px;
                          `}
                        >
                          杭州市较知名的 UI 设计语言
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center',
          }}
          className={css`
            &:hover {
              background-color: ${token.colorBgTextHover};
            }
          `}
        >
          <span> 企业级资产中心</span>
          {/* <CaretDownFilled /> */}
        </div>
      </Popover>
    </div>
  );
};

const Item = (properties) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: '33.33%',
      }}
    >
      {properties.children}
      {/* <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      /> */}
    </div>
  );
};

const List = (properties) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...properties.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {properties.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Array.from({ length: 6 })
          .fill(1)
          .map((_, index) => {
            return <Item key={index}>具体的解决方案-{index}</Item>;
          })}
      </div>
    </div>
  );
};

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档:https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

// export function rootContainer(container) {
//   return React.createElement(
//     ProConfigProvider,
//     null,
//     <BootstrapLayout />,
//     container,
//   );
// }

// export function onRouteChange({
//   location,
//   clientRoutes,
//   routes,
//   action,
//   basename,
// }) {
//   console.log({
//     location,
//     clientRoutes,
//     routes,
//     action,
//     basename,
//   });

//   setCurrentLocation(location);
// }

export const layout = ({ initialState, setInitialState }) => {
  const layoutSettings = getLayoutSetting();

  // console.log(layoutSettings);

  return {
    ...layoutSettings,
    // token: {
    //   colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
    //   colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
    //   colorTextAppListIcon: 'rgba(255,255,255,0.85)',
    //   sider: {
    //     colorBgCollapsedButton: '#fff',
    //     colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
    //     colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
    //     colorMenuBackground: '#004FD9',
    //     colorBgMenuItemCollapsedHover: 'rgba(0,0,0,0.06)',
    //     colorBgMenuItemCollapsedSelected: 'rgba(0,0,0,0.15)',
    //     colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
    //     colorMenuItemDivider: 'rgba(255,255,255,0.15)',
    //     colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
    //     colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
    //     colorTextMenuSelected: '#fff',
    //     colorTextMenuItemHover: 'rgba(255,255,255,0.75)',
    //     colorTextMenu: 'rgba(255,255,255,0.75)',
    //     colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
    //     colorTextMenuTitle: 'rgba(255,255,255,0.95)',
    //     colorTextMenuActive: 'rgba(255,255,255,0.95)',
    //     colorTextSubMenuSelected: '#fff',
    //   },
    // },
    logo: getLogo(),
    title: getTitle(),
    ...initialState?.settings,
    disableContentMargin: false,
    menu: {},
    // menuProps: {
    //   collapsedShowGroupTitle: true,
    // },
    siderMenuType: 'group',
    waterMarkProps: {
      content: 'test',
    },
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title: '七妮妮',
    },
    appList: getApplicationListData(),
    headerTitleRender: (logo, title, _) => {
      const defaultDom = (
        <a>
          {logo}
          {title}
        </a>
      );

      if (document.body.clientWidth < 1400) {
        return defaultDom;
      }

      if (_.isMobile) return defaultDom;

      return (
        <>
          {defaultDom}

          <MenuCard />
        </>
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
    childrenRender: (children, properties) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}

          <Bootstrap />

          <FloatButton.Group
            trigger="click"
            type="primary"
            style={{ right: 24 }}
            icon={iconBuilder.layout()}
          >
            <FloatButton />
            {/* <FloatButton icon={<CommentOutlined />} /> */}
          </FloatButton.Group>

          {!properties.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
              // settings={layoutSettings}
              // onSettingChange={(settings) => {
              //   setInitialState((preInitialState) => ({
              //     ...preInitialState,
              //     settings,
              //   }));
              // }}
            />
          )}
        </>
      );
    },
    footerRender: () => <Footer />,
    // onPageChange: (location) => {},
  };
};
