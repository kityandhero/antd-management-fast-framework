import { DataSingleView } from 'antd-management-fast-framework';

const { DataCore } = DataSingleView;

class BaseView extends DataCore {
  // 组件创建后自动请求 state.loadApiPath 配置的接口数据
  loadRemoteRequestAfterMount = false;

  // 展示组建后进行数据重置
  resetDataAfterLoad = false;
}

export { BaseView };
