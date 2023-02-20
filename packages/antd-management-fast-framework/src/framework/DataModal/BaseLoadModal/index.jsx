import { Base } from '../Base';

class BaseLoadModal extends Base {
  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {
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
