import { Base } from '../Base';

class BaseLoadDrawer extends Base {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      'DataDrawer::BaseLoadDrawer',
      'doOtherWhenChangeVisibleToShow',
    );

    this.reloadData({});
  };
}

export { BaseLoadDrawer };
