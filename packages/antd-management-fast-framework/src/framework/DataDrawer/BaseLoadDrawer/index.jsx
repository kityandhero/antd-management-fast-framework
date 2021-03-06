import Base from '../Base';

class BaseLoadDrawer extends Base {
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProps, preState, snapshot) => {
    this.reloadData({ dataLoading: true }, null, 300);
  };
}

export default BaseLoadDrawer;
