import classNames from 'classnames';
import { Outlet } from 'umi';
import { SettingDrawer } from '@ant-design/pro-components';

import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';

class PageWrapper extends BaseComponent {
  renderFurther() {
    console.log(this);

    return (
      <>
        <div
          style={{
            position: 'relative',
            zIndex: 0,
          }}
        >
          <Outlet />
        </div>

        <SettingDrawer
          enableDarkTheme
          style={{
            zIndexL: '1000',
          }}
        />
      </>
    );
  }
}

export default PageWrapper;
