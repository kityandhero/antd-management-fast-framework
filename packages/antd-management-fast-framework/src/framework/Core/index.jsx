import { getGuid } from 'easy-soft-utility';

import {
  defaultCoreState,
  getDerivedStateFromPropertiesForUrlParametersCore,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

import { switchControlAssist } from '../../utils/switchControlAssist';

class Core extends BaseComponent {
  lastLoadParams = null;

  //#region view control

  viewLoadingFlag = '';

  viewSearchingFlag = '';

  viewRefreshingFlag = '';

  viewReloadingFlag = '';

  viewProcessingFlag = '';

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
  };

  startLoading() {
    this.logCallTrack({}, 'Core', 'startLoading');

    switchControlAssist.open(this.viewLoadingFlag);
  }

  stopLoading() {
    this.logCallTrack({}, 'Core', 'stopLoading');

    switchControlAssist.close(this.viewLoadingFlag);
  }

  startSearching() {
    this.logCallTrack({}, 'Core', 'startSearching');

    switchControlAssist.openMulti([
      this.viewSearchingFlag,
      this.viewLoadingFlag,
    ]);
  }

  stopSearching() {
    this.logCallTrack({}, 'Core', 'stopSearching');

    switchControlAssist.closeMulti([
      this.viewSearchingFlag,
      this.viewLoadingFlag,
    ]);
  }

  startRefreshing() {
    this.logCallTrack({}, 'Core', 'startRefreshing');

    switchControlAssist.openMulti([
      this.viewLoadingFlag,
      this.viewRefreshingFlag,
    ]);
  }

  stopRefreshing() {
    this.logCallTrack({}, 'Core', 'stopRefreshing');

    switchControlAssist.closeMulti([
      this.viewLoadingFlag,
      this.viewRefreshingFlag,
    ]);
  }

  startReloading() {
    this.logCallTrack({}, 'Core', 'startReloading');

    switchControlAssist.openMulti([
      this.viewLoadingFlag,
      this.viewReloadingFlag,
    ]);
  }

  stopReloading() {
    this.logCallTrack({}, 'Core', 'stopReloading');

    switchControlAssist.closeMulti([
      this.viewLoadingFlag,
      this.viewReloadingFlag,
    ]);
  }

  startProcessing() {
    this.logCallTrack({}, 'Core', 'startProcessing');

    switchControlAssist.open(this.viewProcessingFlag);
  }

  stopProcessing() {
    this.logCallTrack({}, 'Core', 'stopProcessing');

    switchControlAssist.close(this.viewProcessingFlag);
  }
}

export { Core };
