/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { history } from 'umi';
import nprogress from 'nprogress';

import { defaultBaseState } from '../../utils/tools';

class Base extends Component {
  mounted = false;

  /**
   *显示render次数开关，用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  renderCount = 0;

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
    setTimeout(() => {
      nprogress.done();
    }, 400);

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

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatchComplete } = {
      ...{ dispatchComplete: true },
      ...nextState,
    };

    if (!!!dispatchComplete) {
      return false;
    }

    return (
      { ...nextProps } != { ...this.props } ||
      { ...nextState } != { ...this.state }
    );
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

  showRenderCount() {
    if (this.showRenderCountInConsole) {
      this.renderCount += 1;

      console.log(`render frequency: ${this.renderCount}`);
    }
  }

  /**
   * check loading progress,if loading or load fail,return false,else return true
   * @returns bool
   */
  checkLoadingProgress() {
    const { dataLoading, loadSuccess } = this.state;

    return dataLoading || !loadSuccess;
  }

  /**
   * check operability,if loading or or processing or load fail,return false,else return true
   * @returns bool
   */
  checkOperability() {
    const { dataLoading, processing, loadSuccess } = this.state;

    return dataLoading || processing || !loadSuccess;
  }

  /**
   * check in progress,if loading or or processing,return false,else return true
   * @returns bool
   */
  checkInProgress() {
    const { dataLoading, processing } = this.state;

    return dataLoading || processing;
  }

  renderFurther() {
    return null;
  }

  render() {
    this.showRenderCount();

    return this.renderFurther();
  }
}

export default Base;
