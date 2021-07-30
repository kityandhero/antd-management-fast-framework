import {
  defaultCoreState,
  getDerivedStateFromPropsForUrlParamsCore,
} from '../../utils/tools';
import Base from '../../framework/Base';

class Core extends Base {
  lastLoadParams = null;

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultCoreState();

    this.state = {
      ...defaultState,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState);
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();
  };

  adjustWhenDidMount = () => {};
}

export default Core;
