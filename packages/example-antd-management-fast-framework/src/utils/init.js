import { configEnvironment } from 'antd-management-fast-framework';

import { prepareModel } from '../modelBuilders';

export function initializeDvaApplication() {
  prepareModel();

  configEnvironment();
}
