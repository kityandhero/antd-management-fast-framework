import { Button, Result } from 'antd';
import { useEffect } from 'react';
import { connect, FormattedMessage, Link, Outlet } from 'umi';
import ProLayout, {
  DefaultFooter,
  SettingDrawer,
} from '@ant-design/pro-layout';

import { getAuthorityFromRouter } from 'antd-management-fast-common/es/utils/core';
import { setAccessWayCollectionCache } from 'antd-management-fast-common/es/utils/globalStorageAssist';
import { proLayoutDefaultProps } from 'antd-management-fast-common/es/utils/proLayoutCollection';
import {
  checkDevelopment,
  formatMessage,
  getQueue,
  logDebug,
} from 'antd-management-fast-common/es/utils/tools';
import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';

import pageRoutes from '../../../config/router.config';
// import Authorized from 'antd-management-fast-component/es/customComponents/Authorized';
import RightContent from '../../components/GlobalHeader/RightContent';
import { accessWayCollection } from '../../customConfig/config';
import { execBasicLayoutRemoteRequest } from '../../customConfig/customLoad';
import {
  defaultFooterData,
  menuHeaderRender,
} from '../../customSpecialComponents/CustomAssembly';
import { defaultSettings } from '../../defaultSettings';

const entrancePath = defaultSettings.getEntrancePath();

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to={entrancePath}>Go Sign In</Link>
      </Button>
    }
  />
);

const menuDataRender = (menuList) => {
  console.log(menuList);

  return menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };

    return null;

    // return Authorized.check(item.authority, localItem, null);
  });
};

const defaultFooterDom = (
  <DefaultFooter
    copyright={defaultFooterData.copyright}
    links={defaultFooterData.links}
  />
);

const footerRender = () => {
  return defaultFooterDom;
};

class BasicLayout extends BaseComponent {
  renderFurther() {
    const {
      dispatch,
      children,
      settings,
      location = {
        pathname: '/',
      },
      global,
      // setSetting
    } = this.props;

    console.log(this.props);

    // useEffect(() => {
    //   if (dispatch) {
    //     setAccessWayCollectionCache(accessWayCollection);
    //     // execBasicLayoutRemoteRequest(dispatch);

    //     // const getSettingType = 'settings/getSetting';

    //     // logDebug(`model access: ${getSettingType}`);

    //     // dispatch({
    //     //   type: getSettingType,
    //     // });
    //   }
    // }, [dispatch]);

    const handleMenuCollapse = (payload) => {
      if (dispatch) {
        const changeLayoutCollapsedType = 'global/changeLayoutCollapsed';

        logDebug(`model access: ${changeLayoutCollapsedType}`);

        dispatch({
          type: changeLayoutCollapsedType,
          payload,
        });
      }
    };

    getQueue();

    const { currentOperator } = global || {
      currentOperator: { platform: { logo: '' } },
    };

    const { platform } = currentOperator || { platform: { logo: '' } };

    const { logo } = platform || { logo: '' };

    console.log(pageRoutes);

    const sss = {
      path: '/',
      routes: [
        {
          path: '/welcome',
          name: '欢迎',
          // icon: <SmileFilled />,
          component: './Welcome',
        },
        {
          path: '/admin',
          name: '管理页',
          // icon: <CrownFilled />,
          access: 'canAdmin',
          component: './Admin',
          routes: [
            {
              path: '/admin/sub-page1',
              name: '一级页面',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
              component: './Welcome',
            },
            {
              path: '/admin/sub-page2',
              name: '二级页面',
              // icon: <CrownFilled />,
              component: './Welcome',
            },
            {
              path: '/admin/sub-page3',
              name: '三级页面',
              // icon: <CrownFilled />,
              component: './Welcome',
            },
          ],
        },
        {
          name: '列表页',
          // icon: <TabletFilled />,
          path: '/list',
          component: './ListTableList',
          routes: [
            {
              path: '/list/sub-page',
              name: '列表页面',
              // icon: <CrownFilled />,
              routes: [
                {
                  path: 'sub-sub-page1',
                  name: '一一级列表页面',
                  // icon: <CrownFilled />,
                  component: './Welcome',
                },
                {
                  path: 'sub-sub-page2',
                  name: '一二级列表页面',
                  // icon: <CrownFilled />,
                  component: './Welcome',
                },
                {
                  path: 'sub-sub-page3',
                  name: '一三级列表页面',
                  // icon: <CrownFilled />,
                  component: './Welcome',
                },
              ],
            },
            {
              path: '/list/sub-page2',
              name: '二级列表页面',
              // icon: <CrownFilled />,
              component: './Welcome',
            },
            {
              path: '/list/sub-page3',
              name: '三级列表页面',
              // icon: <CrownFilled />,
              component: './Welcome',
            },
          ],
        },
        {
          path: 'https://ant.design',
          name: 'Ant Design 官网外链',
          // icon: <ChromeFilled />,
        },
      ],
    };

    return (
      <>
        <ProLayout
          // route={pageRoutes}
          route={sss}
          logo={defaultSettings.getLeftBarLogo(logo)}
          formatMessage={(o) => {
            return <FormattedMessage {...o} />;
          }}
          {...proLayoutDefaultProps}
          // {...props}
          {...settings}
          menuHeaderRender={(logoDom) => {
            return menuHeaderRender(logoDom, this.props);
          }}
          onCollapse={handleMenuCollapse}
          breadcrumbRender={(routers = []) => [
            {
              path: '/',
              breadcrumbName: formatMessage({ id: 'menu.home' }),
            },
            ...routers,
          ]}
          footerRender={footerRender}
          // menuDataRender={menuDataRender}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </div>
          )}
          rightContentRender={() => <RightContent />}
          // waterMarkProps={{
          //   content: 'Pandora',
          //   fontColor: 'rgba(24,144,255,0.15)',
          // }}
        >
          <Outlet />
        </ProLayout>

        {checkDevelopment() ? (
          <SettingDrawer
            settings={settings}
            disableUrlParams={true}
            onSettingChange={(config) => {
              const changeSettingType = 'settings/changeSetting';

              logDebug(`model access: ${changeSettingType}`);

              dispatch({
                type: changeSettingType,
                payload: config,
              });
            }}
          />
        ) : null}
      </>
    );
  }
}

export default connect(({ currentOperator, global, settings }) => ({
  collapsed: global.collapsed,
  settings,
  currentOperator,
  global,
}))(BasicLayout);
