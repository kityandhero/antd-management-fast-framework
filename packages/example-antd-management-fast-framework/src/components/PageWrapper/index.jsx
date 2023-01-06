import { connect, Outlet } from 'umi';
import { SettingDrawer } from '@ant-design/pro-components';

import { actionCore } from 'antd-management-fast-common/es/utils/actionAssist';
import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';

@connect(({ currentOperator, global }) => ({
  currentOperator,
  global,
}))
class PageWrapper extends BaseComponent {
  // doWorkBeforeAdjustDidMount = () => {
  //   actionCore({
  //     api: 'global/getMetaData',
  //     params: { force: true },
  //     target: this,
  //     showProcessing: false,
  //   });

  //   actionCore({
  //     api: 'currentOperator/getCurrentOperator',
  //     params: { force: true },
  //     target: this,
  //     showProcessing: false,
  //   });
  // };

  renderFurther() {
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
