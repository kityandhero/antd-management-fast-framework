import { connect } from 'easy-soft-dva';

import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

const { BaseSelectModal } = DataModal;

const visibleFlag = '9ab50fb4e00643bdab97ac55fa829a93';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class ApplicationSelectModal extends BaseSelectModal {
  submitWithForm = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '选择应用',
      loadApiPath: 'application/singleList',
    };
  }
}

export { ApplicationSelectModal };
