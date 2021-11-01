/* eslint-disable no-unused-vars */
import { PureComponent } from 'react';
import { history } from 'umi';
import nprogress from 'nprogress';

import { defaultBaseState } from '../../utils/tools';

class Base extends PureComponent {
  mounted = false;

  constructor(props) {
    super(props);

    this.mounted = false;

    const defaultState = defaultBaseState();

    this.state = defaultState;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    nprogress.done();

    this.beforeDidMount();

    this.mounted = true;

    this.doDidMountTask();

    this.afterDidMount();
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProps, preState) {
    return this.doWhenGetSnapshotBeforeUpdate(preProps, preState);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProps, preState, snapshot);
  }

  componentWillUnmount() {
    this.beforeUnmount();

    this.mounted = false;

    this.setState = () => {};

    this.afterUnmount();
  }

  doDidMountTask = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {};

  beforeDidMount = () => {};

  afterDidMount = () => {};

  beforeUnmount = () => {};

  afterUnmount = () => {};

  goToPath = (path) => {
    const location = {
      pathname: path,
    };

    nprogress.inc();

    history.push(location);
  };

  redirectToPath = (path) => {
    const location = {
      pathname: path,
    };

    nprogress.inc();

    history.replace(location);
  };

  checkHasMore = (pageNo, pageSize, total) => {
    if ((total || 0) <= 0) {
      return false;
    }

    return (pageNo || 0) * (pageSize || 0) < (total || 0);
  };

  render() {
    return null;
  }
}

export default Base;
