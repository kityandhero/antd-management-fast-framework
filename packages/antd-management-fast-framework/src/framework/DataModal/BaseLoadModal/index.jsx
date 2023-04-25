import { Base } from '../Base';

class BaseLoadModal extends Base {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      'DataModal::BaseLoadModal',
      'doOtherWhenChangeVisibleToShow',
    );

    if (this.reloadWhenShow) {
      const form = this.getTargetForm();

      if (form) {
        form.resetFields();
      }

      this.reloadData({ dataLoading: true }, null, 300);
    }
  };

  buildOkText = () => {
    return '确定';
  };
}

export { BaseLoadModal };
