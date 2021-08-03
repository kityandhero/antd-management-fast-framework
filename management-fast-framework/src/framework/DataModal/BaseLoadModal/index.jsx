import Base from '../Base';

class BaseLoadModal extends Base {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState({ dataLoading: true });

    if (this.reloadWhenShow) {
      const form = this.getTargetForm();

      if (form != null) {
        form.resetFields();
      }

      setTimeout(() => {
        this.reloadData();
      }, 700);
    } else {
      this.setState({ dataLoading: false });
    }

    this.executeAfterDoOtherWhenChangeVisible();
  };

  buildOkText = () => {
    return '确定';
  };
}

export default BaseLoadModal;
