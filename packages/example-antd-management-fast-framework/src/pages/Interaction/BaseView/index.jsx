import { DataSingleView } from 'antd-management-fast-framework';

const { DataCore } = DataSingleView;

class BaseView extends DataCore {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;
}

export default BaseView;
