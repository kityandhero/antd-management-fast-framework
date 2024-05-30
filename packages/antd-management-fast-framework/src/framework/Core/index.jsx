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
 * 框架内核定义类。
 * @namespace framework
 * @class Core
 * @augments BaseComponent
 */
class Core extends BaseComponent {
  /**
   * 最近一次调用数据加载时候的传递参数。
   * @member {Object}
   */
  lastLoadParams = null;

  //#region view control 视图控制

  /**
   * 加载中的标记符号变量，默认 ""。
   * @member {string}
   */
  viewLoadingFlag = '';

  /**
   * 搜索中的标记符号变量，默认 ""。
   * @member {string}
   */
  viewSearchingFlag = '';

  /**
   * 重置中的标记符号变量，默认 ""。
   * @member {string}
   */
  viewResettingFlag = '';

  /**
   * 刷新中的标记符号变量，默认 ""。
   * @member {string}
   */
  viewRefreshingFlag = '';

  /**
   * 重新载入中的标记符号变量，默认 ""。
   * @member {string}
   */
  viewReloadingFlag = '';

  /**
   * 处理中的标记符号变量，默认 ""。
   * @member {string}
   */
  viewProcessingFlag = '';

  /**
   * 标签页标记符号变量，默认 ""。
   * @member {string}
   */
  viewTabFlag = '';

  /**
   * 菜单页标记符号变量，默认 ""。
   * @member {string}
   */
  viewMenuFlag = '';

  /**
   * 动画提示标记符号变量，默认 ""。
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
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParametersCore(
      nextProperties,
      previousState,
    );
  }

  /**
   * 调用过程显示开关，用于开发辅助，showCallProcess 设置为 true 之后，在控制台显示调用过程。
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

  /**
   * 组件执行卸载后将会触发的逻辑。
   * @function
   */
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

  /**
   * 获取标记变量集合。
   * @function
   */
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

  /**
   * 获取当前激活的 Tab 页标记。
   * @function
   */
  getTabActiveKey = () => {
    return tabControlAssist.getActiveKey(this.viewTabFlag);
  };

  /**
   * 设置当前激活的 Tab 页标记。
   * @function
   * @param {string} key Tab页标记值
   */
  setTabActiveKey(key) {
    this.logCallTrack({}, primaryCallName, 'setTabActiveKey');

    tabControlAssist.setActiveKey(this.viewTabFlag, key);
  }

  /**
   * 获取当前激活的 Menu 页标记。
   * @function
   */
  getMenuActiveKey = () => {
    return menuControlAssist.getActiveKey(this.viewMenuFlag);
  };

  /**
   * 设置当前激活的 Menu 页标记。
   * @function
   * @param {string} key Menu页标记值
   */
  setMenuActiveKey(key) {
    this.logCallTrack(primaryCallName, 'setMenuActiveKey');

    menuControlAssist.setActiveKey(this.viewMenuFlag, key);
  }

  /**
   * 开始加载，影响"加载中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  startLoading(...messages) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'startLoading');

    switchControlAssist.open(
      this.viewLoadingFlag,
      this.componentName,
      'viewLoadingFlag',
      ...messages,
    );
  }

  /**
   * 停止加载，影响"加载中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  stopLoading(...messages) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopLoading');

    switchControlAssist.close(
      this.viewLoadingFlag,
      this.componentName,
      'viewLoadingFlag',
      ...messages,
    );
  }

  /**
   * 开始搜索，影响"搜索中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  startSearching(...messages) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startSearching',
    );

    switchControlAssist.openMulti(
      [this.viewSearchingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewSearchingFlag', 'viewLoadingFlag'],
      ...messages,
    );
  }

  /**
   * 停止搜索，影响"搜索中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  stopSearching(...messages) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopSearching');

    switchControlAssist.closeMulti(
      [this.viewSearchingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewSearchingFlag', 'viewLoadingFlag'],
      ...messages,
    );
  }

  /**
   * 开始重置，影响"重置中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  startResetting(...messages) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startResetting',
    );

    switchControlAssist.openMulti(
      [this.viewResettingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewResettingFlag', 'viewLoadingFlag'],
      ...messages,
    );
  }

  /**
   * 停止重置，影响"重置中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  stopResetting(...messages) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopResetting');

    switchControlAssist.closeMulti(
      [this.viewResettingFlag, this.viewLoadingFlag],
      this.componentName,
      ['viewResettingFlag', 'viewLoadingFlag'],
      ...messages,
    );
  }

  /**
   * 开始刷新，影响"刷新中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  startRefreshing(...messages) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startRefreshing',
    );

    switchControlAssist.openMulti(
      [this.viewLoadingFlag, this.viewRefreshingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewRefreshingFlag'],
      ...messages,
    );
  }

  /**
   * 停止刷新，影响"刷新中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  stopRefreshing(...messages) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'stopRefreshing',
    );

    switchControlAssist.closeMulti(
      [this.viewLoadingFlag, this.viewRefreshingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewRefreshingFlag'],
      ...messages,
    );
  }

  /**
   * 开始重载，影响"重载中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  startReloading(...messages) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startReloading',
    );

    switchControlAssist.openMulti(
      [this.viewLoadingFlag, this.viewReloadingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewReloadingFlag'],
      ...messages,
    );
  }

  /**
   * 停止重载，影响"重载中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  stopReloading(...messages) {
    this.logCallTrack(this.getViewFlagInfo(), primaryCallName, 'stopReloading');

    switchControlAssist.closeMulti(
      [this.viewLoadingFlag, this.viewReloadingFlag],
      this.componentName,
      ['viewLoadingFlag', 'viewReloadingFlag'],
      ...messages,
    );
  }

  /**
   * 开始处理，影响"处理中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  startProcessing(...messages) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'startProcessing',
    );

    switchControlAssist.open(
      this.viewProcessingFlag,
      this.componentName,
      'viewProcessingFlag',
      ...messages,
    );
  }

  /**
   * 停止处理，影响"处理中"效果。
   * @function
   * @param {Array} messages 消息或消息集合
   */
  stopProcessing(...messages) {
    this.logCallTrack(
      this.getViewFlagInfo(),
      primaryCallName,
      'stopProcessing',
    );

    switchControlAssist.close(
      this.viewProcessingFlag,
      this.componentName,
      'viewProcessingFlag',
      ...messages,
    );
  }

  /**
   * 检查加载进度，如果加载或加载失败，返回false，否则返回true。
   */
  checkLoadingProgress() {
    const { dataLoading, loadSuccess } = this.state;

    return dataLoading || !loadSuccess;
  }

  /**
   * 检查可操作性，如果加载或处理或加载失败，返回false，否则返回true。
   */
  checkOperability() {
    const { loadSuccess } = this.state;

    return !loadSuccess;
  }

  /**
   * 检查是否在加载或处理中，如果正在加载或正在处理，返回false，否则返回true。
   */
  checkInProgress() {
    const { dataLoading, processing } = this.state;

    return dataLoading || processing;
  }
}

export { Core };
