import { getGuid } from 'easy-soft-utility';

import {
  defaultCoreState,
  getDerivedStateFromPropertiesForUrlParametersCore,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

import { switchControlAssist } from '../../utils/switchControlAssist';
import { tabControlAssist } from '../../utils/tabControlAssist';

class Core extends BaseComponent {
  lastLoadParams = null;

  //#region view control

  viewLoadingFlag = '';

  viewSearchingFlag = '';

  viewRefreshingFlag = '';

  viewReloadingFlag = '';

  viewProcessingFlag = '';

  viewTabFlag = '';

  //#endregion

  constructor(properties) {
    super(properties);

    this.lastLoadParams = null;

    const defaultState = defaultCoreState();

    this.state = {
      ...defaultState,
    };

    this.viewLoadingFlag = getGuid();
    this.viewSearchingFlag = getGuid();
    this.viewRefreshingFlag = getGuid();
    this.viewReloadingFlag = getGuid();
    this.viewProcessingFlag = getGuid();
    this.viewTabFlag = getGuid();
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParametersCore();
  }

  doWorkAfterUnmount = () => {
    const list = [
      this.viewLoadingFlag,
      this.viewSearchingFlag,
      this.viewRefreshingFlag,
      this.viewReloadingFlag,
      this.viewProcessingFlag,
    ];

    switchControlAssist.removeMulti(list);
    tabControlAssist.remove(this.viewTabFlag);
  };

  setTabActiveKey(key) {
    this.logCallTrack(
      {
        parameter: { key },
      },
      'Core',
      'setTabActiveKey',
    );

    tabControlAssist.setActiveKey(this.viewTabFlag, key);
  }

  startLoading(...message) {
    this.logCallTrack({}, 'Core', 'startLoading');

    switchControlAssist.open(
      this.viewLoadingFlag,
      this.componentName,
      'viewLoadingFlag',
      ...message,
    );
  }

  stopLoading(...message) {
    this.logCallTrack({}, 'Core', 'stopLoading');

    switchControlAssist.close(
      this.viewLoadingFlag,
      this.componentName,
      'viewLoadingFlag',
      ...message,
    );
  }

  startSearching(...message) {
    this.logCallTrack({}, 'Core', 'startSearching');

    switchControlAssist.openMulti(
      [this.viewSearchingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewSearchingFlag', 'viewLoadingFlag'],
      ...message,
    );
  }

  stopSearching(...message) {
    this.logCallTrack({}, 'Core', 'stopSearching');

    switchControlAssist.closeMulti(
      [this.viewSearchingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewSearchingFlag', 'viewLoadingFlag'],
      ...message,
    );
  }

  startRefreshing(...message) {
    this.logCallTrack({}, 'Core', 'startRefreshing');

    switchControlAssist.openMulti(
      [this.viewLoadingFlag, this.viewRefreshingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewRefreshingFlag'],
      ...message,
    );
  }

  stopRefreshing(...message) {
    this.logCallTrack({}, 'Core', 'stopRefreshing');

    switchControlAssist.closeMulti(
      [this.viewLoadingFlag, this.viewRefreshingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewRefreshingFlag'],
      ...message,
    );
  }

  startReloading(...message) {
    this.logCallTrack({}, 'Core', 'startReloading');

    switchControlAssist.openMulti(
      [this.viewLoadingFlag, this.viewReloadingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewReloadingFlag'],
      ...message,
    );
  }

  stopReloading(...message) {
    this.logCallTrack({}, 'Core', 'stopReloading');

    switchControlAssist.closeMulti(
      [this.viewLoadingFlag, this.viewReloadingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewReloadingFlag'],
      ...message,
    );
  }

  startProcessing(...message) {
    this.logCallTrack({}, 'Core', 'startProcessing');

    switchControlAssist.open(
      this.viewProcessingFlag,
      this.componentName,
      'viewProcessingFlag',
      ...message,
    );
  }

  stopProcessing(...message) {
    this.logCallTrack({}, 'Core', 'stopProcessing');

    switchControlAssist.close(
      this.viewProcessingFlag,
      this.componentName,
      'viewProcessingFlag',
      ...message,
    );
  }

  /**
   * check loading progress,if loading or load fail,return false,else return true
   */
  checkLoadingProgress() {
    const { dataLoading, loadSuccess } = this.state;

    return dataLoading || !loadSuccess;
  }

  /**
   * check operability,if loading or or processing or load fail,return false,else return true
   */
  checkOperability() {
    const { loadSuccess } = this.state;

    return !loadSuccess;
  }

  /**
   * check in progress,if loading or or processing,return false,else return true
   */
  checkInProgress() {
    const { dataLoading, processing } = this.state;

    return dataLoading || processing;
  }
}

export { Core };
