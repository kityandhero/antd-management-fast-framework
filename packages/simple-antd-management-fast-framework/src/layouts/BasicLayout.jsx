import { Button, Result } from 'antd';
import { useEffect } from 'react';
import { connect, FormattedMessage, Link } from 'umi';
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';

import Authorized from 'antd-management-fast-framework/es/utils/Authorized';
import { setAccessWayCollectionCache } from 'antd-management-fast-framework/es/utils/globalStorageAssist';
import { proLayoutDefaultProps } from 'antd-management-fast-framework/es/utils/proLayoutCollection';
import {
  checkDevelopment,
  getQueue,
  recordDebug,
} from 'antd-management-fast-framework/es/utils/tools';
import { getAuthorityFromRouter } from 'antd-management-fast-framework/es/utils/utils';

import RightContent from '@/components/GlobalHeader/RightContent';
import { accessWayCollection } from '@/customConfig/config';
import { execBasicLayoutRemoteRequest } from '@/customConfig/customLoad';
import { defaultFooterData, menuHeaderRender } from '@/customSpecialComponents/CustomAssembly';
import { defaultSettings } from '@/defaultSettings';
import { formatMessage } from '@/utils/tools';

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

const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };

    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter copyright={defaultFooterData.copyright} links={defaultFooterData.links} />
);

const footerRender = () => {
  return defaultFooterDom;
};

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    global,
    // setSetting
  } = props;

  useEffect(() => {
    if (dispatch) {
      setAccessWayCollectionCache(accessWayCollection);
      execBasicLayoutRemoteRequest(dispatch);

      const getSettingType = 'settings/getSetting';

      recordDebug(`modal access: ${getSettingType}`);

      dispatch({
        type: getSettingType,
      });
    }
  }, [dispatch]);

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      const changeLayoutCollapsedType = 'global/changeLayoutCollapsed';

      recordDebug(`modal access: ${changeLayoutCollapsedType}`);

      dispatch({
        type: changeLayoutCollapsedType,
        payload,
      });
    }
  };

  getQueue();

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const { currentOperator } = global || {
    currentOperator: { platform: { logo: '' } },
  };

  const { platform } = currentOperator || { platform: { logo: '' } };

  const { logo } = platform || { logo: '' };

  return (
    <>
      <ProLayout
        logo={defaultSettings.getLeftBarLogo(logo)}
        formatMessage={(o) => {
          return <FormattedMessage {...o} />;
        }}
        {...proLayoutDefaultProps}
        {...props}
        {...settings}
        menuHeaderRender={(logoDom) => {
          return menuHeaderRender(logoDom, props);
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
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        // waterMarkProps={{
        //   content: 'Pandora',
        //   fontColor: 'rgba(24,144,255,0.15)',
        // }}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      {checkDevelopment() ? (
        <SettingDrawer
          settings={settings}
          disableUrlParams={true}
          onSettingChange={(config) => {
            const changeSettingType = 'settings/changeSetting';

            recordDebug(`modal access: ${changeSettingType}`);

            dispatch({
              type: changeSettingType,
              payload: config,
            });
          }}
        />
      ) : null}
    </>
  );
};

export default connect(({ currentOperator, global, settings }) => ({
  collapsed: global.collapsed,
  settings,
  currentOperator,
  global,
}))(BasicLayout);
