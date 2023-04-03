import { Base } from '../Base';

class BaseLoadDrawer extends Base {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {
    this.reloadData({ dataLoading: true }, null, 300);
  };
}

export { BaseLoadDrawer };
