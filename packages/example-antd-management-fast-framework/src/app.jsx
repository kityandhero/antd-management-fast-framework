import { Button, Divider, Input, Popover, theme } from 'antd';
import nprogress from 'nprogress';
import React from 'react';
import { Link } from 'umi';
import { SettingDrawer } from '@ant-design/pro-components';
import { css } from '@emotion/css';

import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import { setCurrentLocation } from 'antd-management-fast-common/es/utils/routeAssist';
import Bootstrap from 'antd-management-fast-framework/es/customComponents/Bootstrap';
import { getAppListData } from 'antd-management-fast-framework/es/utils/appListDataAssist';
import { getLayoutSetting } from 'antd-management-fast-framework/es/utils/layoutSettingAssist';

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
              {new Array(3).fill(1).map((name, index) => {
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

const Item = (props) => {
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
      {props.children}
      {/* <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      /> */}
    </div>
  );
};

const List = (props) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...props.style,
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
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {new Array(6).fill(1).map((_, index) => {
          return <Item key={index}>具体的解决方案-{index}</Item>;
        })}
      </div>
    </div>
  );
};

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
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

export const layout = () => {
  const layoutSettings = getLayoutSetting();

  console.log(layoutSettings);

  return {
    ...(layoutSettings || {}),
    ...{
      logo: getLogo(),
      title: getTitle(),
      menu: {
        locale: false,
      },
      disableContentMargin: false,
      menu: {
        collapsedShowGroupTitle: true,
      },
      siderMenuType: 'group',
      waterMarkProps: {
        content: 'test',
      },
      avatarProps: {
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: '七妮妮',
      },
      appList: getAppListData(),
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
      childrenRender: (children, props) => {
        // if (initialState?.loading) return <PageLoading />;
        return (
          <>
            {children}

            <Bootstrap />

            {!props.location?.pathname?.includes('/login') && (
              <SettingDrawer
                enableDarkTheme
                settings={layoutSettings}
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
      onPageChange: (location) => {
        console.log(location);
      },
    },
  };
};
