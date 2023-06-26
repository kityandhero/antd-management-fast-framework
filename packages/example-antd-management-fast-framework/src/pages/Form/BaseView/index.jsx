import { DataForm } from 'antd-management-fast-framework';

const { BaseAddForm } = DataForm;

class BaseView extends BaseAddForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      submitApiPath: 'simple/addBasicInfo',
    };
  }
}

export default BaseView;
