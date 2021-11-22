import Base from '../Base';

class BaseLoadModal extends Base {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProps, preState, snapshot) => {
    if (this.reloadWhenShow) {
      const form = this.getTargetForm();

      if (form != null) {
        form.resetFields();
      }

      this.reloadData({ dataLoading: true }, null, 300);
    }
  };

  buildOkText = () => {
    return '确定';
  };
}

export default BaseLoadModal;
