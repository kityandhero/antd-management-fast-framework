/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { history } from 'umi';
import nprogress from 'nprogress';

import { defaultBaseState, isObject } from '../../utils/tools';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function filterModel(props) {
  const result = { ...props };

  delete result.loading;

  Object.entries(result).forEach((o) => {
    const [k, v] = o;

    if (isObject(v)) {
      if (!!v.fromRemote) {
        delete result[k];
      }
    }
  });

  return result;
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(a, b) {
  // 调用Object.is判断是否相等，相同返回true，不同返回false
  if (Object.is(a, b)) {
    return true;
  }

  // object.is比较发现不等，但并不代表真的不等，object对象还需要比较
  // 这里判断是否是object，如果不是，那直接返回false
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 比较对象中的keys长度，不等返回false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 比较对象中相同的key的val是否相等
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(b, keysA[i]) ||
      !Object.is(a[keysA[i]], b[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}

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
    if (defaultSettingsLayoutCustom.getUseNprogress()) {
      setTimeout(() => {
        nprogress.done();
      }, 400);
    }

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

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProps,
      nextState,
    );

    if ((checkComponentUpdate || null) != null) {
      return !!checkComponentUpdate;
    }

    const nextPropsIgnoreModel = filterModel(nextProps);
    const currentPropsIgnoreModel = filterModel(this.props);

    return (
      !shallowEqual(nextPropsIgnoreModel, currentPropsIgnoreModel) ||
      !shallowEqual(nextState, this.state)
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
  doOtherCheckComponentUpdate = (nextProps, nextState) => {
    return null;
  };

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

    if (defaultSettingsLayoutCustom.getUseNprogress()) {
      nprogress.inc();
    }

    history.push(location);
  };

  redirectToPath = (path) => {
    const location = {
      pathname: path,
    };

    if (defaultSettingsLayoutCustom.getUseNprogress()) {
      nprogress.inc();
    }

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
