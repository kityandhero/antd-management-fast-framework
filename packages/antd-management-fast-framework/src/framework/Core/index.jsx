import {
  defaultCoreState,
  getDerivedStateFromPropsForUrlParamsCore,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

class Core extends BaseComponent {
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
    return getDerivedStateFromPropsForUrlParamsCore();
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();
  };

  adjustWhenDidMount = () => {};
}

export { Core };
