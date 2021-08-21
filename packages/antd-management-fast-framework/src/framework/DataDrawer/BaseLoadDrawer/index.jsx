import Base from '../Base';

class BaseLoadDrawer extends Base {
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState({ dataLoading: true });

    setTimeout(() => {
      this.reloadData();
    }, 700);

    this.executeAfterDoOtherWhenChangeVisible();
  };
}

export default BaseLoadDrawer;
