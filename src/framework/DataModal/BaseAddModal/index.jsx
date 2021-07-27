import Base from '../Base';

class BaseAddModal extends Base {
  reloadWhenShow = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible: false,
        needReset: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = nextProps;
    const { visible: visiblePre, externalData } = prevState;

    let needReset = false;

    if (visiblePre === false && visible === true) {
      needReset = true;
    }

    return { visible, needReset, externalData };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { needReset, visible } = this.state;

    if (visible && !visiblePre) {
      const form = this.getTargetForm();

      if (form != null) {
        if (needReset) {
          form.resetFields();

          this.setState({ needReset: false });
        }
      }

      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    if (this.reloadWhenShow) {
      this.setState({ dataLoading: true });

      setTimeout(() => {
        this.reloadData();
      }, 700);
    }
  };
}

export default BaseAddModal;
