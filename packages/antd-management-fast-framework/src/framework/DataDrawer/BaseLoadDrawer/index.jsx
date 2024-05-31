import { BaseFormDrawer } from '../BaseFormDrawer';

const primaryCallName = 'DataDrawer::BaseLoadDrawer';

/**
 * base load drawer
 * @namespace framework.DataDrawer
 * @class BaseLoadDrawer
 * @extends BaseFormDrawer
 */
class BaseLoadDrawer extends BaseFormDrawer {
  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

    this.logCallTrace(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToShow',
      'trigger',
      'reloadData',
    );

    this.reloadData({});
  };
}

export { BaseLoadDrawer };
