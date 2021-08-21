import BaseSaveDrawer from '../BaseSaveDrawer';

class BaseAddDrawer extends BaseSaveDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }
}

export default BaseAddDrawer;
