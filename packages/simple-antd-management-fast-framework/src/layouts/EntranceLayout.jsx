import { Helmet, HelmetProvider } from 'react-helmet-async';
import { connect } from 'umi';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';

import Bubbly from 'antd-management-fast-framework/es/customComponents/Canvas/Bubbly';
import FlexBox from 'antd-management-fast-framework/es/customComponents/FlexBox';
import VerticalBox from 'antd-management-fast-framework/es/customComponents/VerticalBox';

import { defaultSettings } from '@/defaultSettings';
import { formatMessage } from '@/utils/tools';

import styles from './EntranceLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);

  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    title: defaultSettings.getTitle(),
    ...props,
  });

  console.log(children);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <FlexBox
        flexAuto="top"
        vertical={{
          bottomHeight: '180rpx',
        }}
        top={
          <VerticalBox
            align="center"
            alignJustify="center"
            style={{
              height: '100%',
            }}
          >
            <div className={styles.content}>
              <div className={styles.top}>{children}</div>
            </div>
          </VerticalBox>
        }
        bottom={
          <DefaultFooter
            style={{ background: 'inherit' }}
            links={[]}
            copyright={defaultSettings.getCopyright() || ''}
          />
        }
      />

      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: -1,
        }}
      >
        <Bubbly />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
