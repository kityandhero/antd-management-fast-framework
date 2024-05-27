import {
  getGuid,
  logDebug,
  mergeArrowText,
  toBoolean,
  toString,
} from 'easy-soft-utility';

import {
  defaultCoreState,
  getDerivedStateFromPropertiesForUrlParametersCore,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

import { menuControlAssist } from '../../utils/menuControlAssist';
import { switchControlAssist } from '../../utils/switchControlAssist';
import { tabControlAssist } from '../../utils/tabControlAssist';

const primaryCallName = 'Core';

/**
 * core
 * @namespace framework
 * @class Core
 * @augments BaseComponent
 */
class Core extends BaseComponent {
  /**
   * view loading flag
   * @member {Object}
   */
  lastLoadParams = null;

  //#region view control

  /**
   * view loading flag
   * @member {string}
   */
  viewLoadingFlag = '';

  /**
   * view searching flag
   * @member {string}
   */
  viewSearchingFlag = '';

  /**
   * view resetting flag
   * @member {string}
   */
  viewResettingFlag = '';

  /**
   * view refreshing flag
   * @member {string}
   */
  viewRefreshingFlag = '';

  /**
   * view reloading flag
   * @member {string}
   */
  viewReloadingFlag = '';

  /**
   * view processing flag
   * @member {string}
   */
  viewProcessingFlag = '';

  /**
   * view tab flag
   * @member {string}
   */
  viewTabFlag = '';

  /**
   * view menu flag
   * @member {string}
   */
  viewMenuFlag = '';

  /**
   * view animal prompt flag
   * @member {string}
   */
  viewAnimalPromptFlag = '';

  //#endregion

  /**
   * @constructs
   * @param {Object} properties
   */
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
    this.viewResettingFlag = getGuid();
    this.viewReloadingFlag = getGuid();
    this.viewProcessingFlag = getGuid();
    this.viewTabFlag = getGuid();
    this.viewMenuFlag = getGuid();
    this.viewAnimalPromptFlag = getGuid();
  }

  /**
   * get derived state from props
   * @static
   * @param {Object} nextProperties
   * @param {Object} previousState
   * @returns {Object}
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParametersCore(
      nextProperties,
      previousState,
    );
  }

  /**
   * prompt call process switch
   * @function
   */
  promptCallProcessSwitch = () => {
    if (!this.showCallProcessSwitchPromptComplete) {
      logDebug(
        {},
        mergeArrowText(
          this.componentName,
          'showCallProcess',
          toString(toBoolean(this.showCallProcess)),
          'do not show call process, if want wo show it, please set "this.showCallProcess" to true',
        ),
      );

      this.showCallProcessSwitchPromptComplete = true;
    }
  };

  doWorkAfterUnmount = () => {
    const list = [
      this.viewLoadingFlag,
      this.viewSearchingFlag,
      this.viewResettingFlag,
      this.viewRefreshingFlag,
      this.viewReloadingFlag,
      this.viewProcessingFlag,
      this.viewAnimalPromptFlag,
    ];

    switchControlAssist.removeMulti(list);
    tabControlAssist.remove(this.viewTabFlag);
    menuControlAssist.remove(this.viewMenuFlag);
  };

  getViewFlagInfo() {
    return {
      viewLoadingFlag: this.viewLoadingFlag,
      viewSearchingFlag: this.viewSearchingFlag,
      viewRefreshingFlag: this.viewRefreshingFlag,
      viewResettingFlag: this.viewResettingFlag,
      viewReloadingFlag: this.viewReloadingFlag,
      viewProcessingFlag: this.viewProcessingFlag,
      viewTabFlag: this.viewTabFlag,
      viewMenuFlag: this.viewMenuFlag,
      viewAnimalPromptFlag: this.viewAnimalPromptFlag,
    };
  }

  getTabActiveKey = () => {
    return tabControlAssist.getActiveKey(this.viewTabFlag);
  };

  setTabActiveKey(key) {
    this.logCallTrack({}, primaryCallName, 'setTabActiveKey');

    tabControlAssist.setActiveKey(this.viewTabFlag, key);
  }

  getMenuActiveKey = () => {
    return menuControlAssist.getActiveKey(this.viewMenuFlag);
  };

  setMenuActiveKey(key) {
    this.logCallTrack(primaryCallName, 'setMenuActiveKey');

    menuControlAssist.setActiveKey(this.viewMenuFlag, key);
  }

  startLoading(...message) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'startLoading');

    switchControlAssist.open(
      this.viewLoadingFlag,
      this.componentName,
      'viewLoadingFlag',
      ...message,
    );
  }

  stopLoading(...message) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopLoading');

    switchControlAssist.close(
      this.viewLoadingFlag,
      this.componentName,
      'viewLoadingFlag',
      ...message,
    );
  }

  startSearching(...message) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startSearching',
    );

    switchControlAssist.openMulti(
      [this.viewSearchingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewSearchingFlag', 'viewLoadingFlag'],
      ...message,
    );
  }

  stopSearching(...message) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopSearching');

    switchControlAssist.closeMulti(
      [this.viewSearchingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewSearchingFlag', 'viewLoadingFlag'],
      ...message,
    );
  }

  startResetting(...message) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startResetting',
    );

    switchControlAssist.openMulti(
      [this.viewResettingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewResettingFlag', 'viewLoadingFlag'],
      ...message,
    );
  }

  stopResetting(...message) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopResetting');

    switchControlAssist.closeMulti(
      [this.viewResettingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewResettingFlag', 'viewLoadingFlag'],
      ...message,
    );
  }

  startRefreshing(...message) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startRefreshing',
    );

    switchControlAssist.openMulti(
      [this.viewLoadingFlag, this.viewRefreshingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewRefreshingFlag'],
      ...message,
    );
  }

  stopRefreshing(...message) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'stopRefreshing',
    );

    switchControlAssist.closeMulti(
      [this.viewLoadingFlag, this.viewRefreshingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewRefreshingFlag'],
      ...message,
    );
  }

  startReloading(...message) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startReloading',
    );

    switchControlAssist.openMulti(
      [this.viewLoadingFlag, this.viewReloadingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewReloadingFlag'],
      ...message,
    );
  }

  stopReloading(...message) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopReloading');

    switchControlAssist.closeMulti(
      [this.viewLoadingFlag, this.viewReloadingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewReloadingFlag'],
      ...message,
    );
  }

  startProcessing(...message) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startProcessing',
    );

    switchControlAssist.open(
      this.viewProcessingFlag,
      this.componentName,
      'viewProcessingFlag',
      ...message,
    );
  }

  stopProcessing(...message) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'stopProcessing',
    );

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
