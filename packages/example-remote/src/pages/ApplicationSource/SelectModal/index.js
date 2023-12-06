import { connect } from 'easy-soft-dva';

import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

const { BaseSelectModal } = DataModal;

const visibleFlag = '7b2679411ce24c8f9b90da367ce5adc9';

@connect(
  ({ applicationSource, administrativeDivision, schedulingControl }) => ({
    applicationSource,
    administrativeDivision,
    schedulingControl,
  }),
)
class SelectModal extends BaseSelectModal {
  submitWithForm = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '选择应用模板',
      loadApiPath: 'applicationSource/singleList',
    };
  }
}

export { SelectModal };
