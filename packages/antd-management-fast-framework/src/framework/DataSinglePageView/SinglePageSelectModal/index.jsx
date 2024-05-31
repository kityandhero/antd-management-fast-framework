import {
  isArray,
  isEmptyArray,
  isFunction,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  emptyLogic,
  formNameCollection,
} from 'antd-management-fast-common';
import {
  buildListViewItemActionSelect,
  iconBuilder,
} from 'antd-management-fast-component';

import { SinglePageModal } from '../SinglePageModal';

const primaryCallName = 'DataSinglePageView::SinglePageSelectModal';

/**
 * Single Page Select Modal
 * @namespace DataSinglePageView
 * @class SinglePageSelectModal
 * @extends SinglePageModal
 */
class SinglePageSelectModal extends SinglePageModal {
  /**
   * 在列表视图下显示选择动作，默认 true。
   * @member {boolean}
   */
  showListViewItemActionSelect = true;

  /**
   * 是否显示批量操作动作，默认 true。
   * @member {boolean}
   */
  batchActionSwitch = true;

  /**
   * 使用前端模拟分页，默认 false。
   * @member {boolean}
   */
  useFrontendPagination = false;

  /**
   * 指定使用选择二次确认模式, 默认 false, 不使用二次选择确认时可不用特殊指定
   * @member {boolean}
   */
  confirmSelect = false;

  /**
   * 已选择的数据集合
   * @member {Array}
   */
  selectListData = [];

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

  /**
   * 切换为显示状态后，doOtherWhenChangeVisibleToShow 执行后的附加逻辑，如无必要，请勿重写。
   * @function
   */
  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToShow',
    );

    this.logCallTrace(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToShow',
      'reset selectListData => [] when showSelect is false',
    );

    const { showSelect } = this.state;

    if (!showSelect) {
      this.selectListData = [];
    }
  };

  /**
   * 切换为隐藏状态后的额外执行逻辑
   * @function
   */
  doOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToHide');

    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
      );

      if (!isArray(this.selectListData) || isEmptyArray(this.selectListData)) {
        showSimpleWarnMessage('没有已选择的数据项目');

        return;
      }

      const { showSelect } = this.state;

      if (showSelect) {
        afterSelectSuccess(this.selectListData);
      } else {
        afterSelectSuccess(this.selectListData[0]);
      }
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
        emptyLogic,
      );
    }
  };

  establishPresetBatchActionSize = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishPresetBatchActionSize',
      'small',
    );

    return 'small';
  };

  establishPresetBatchActionText = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishPresetBatchActionText',
      '确定选择',
    );

    return '确定选择';
  };

  establishPresetBatchActionIcon = () => {
    this.logCallTrack({}, primaryCallName, 'establishPresetBatchActionIcon');

    return iconBuilder.select();
  };

  handleSelectRows = (rows) => {
    this.selectListData = rows;

    this.setState({
      selectedDataTableDataRows: rows,
    });
  };

  onBatchActionClick = () => {
    this.execSelect();
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '选取',
      placement: 'topRight',
      icon: iconBuilder.import(),
      handleButtonClick: ({ handleData }) => {
        this.selectRecord({ handleData: handleData || null });
      },
      handleData: record,
      confirm: this.confirmSelect,
      title: this.confirmSelect ? '确定选择此项吗？' : '',
    };
  };

  selectRecord = ({ handleData }) => {
    this.logCallTrack({}, primaryCallName, 'selectRecord');

    const { showSelect } = this.state;

    if (!isArray(this.selectListData)) {
      this.selectListData = [];
    }

    if (showSelect) {
      this.selectListData.push(handleData);
    } else {
      this.selectListData = [handleData];
    }

    this.execSelect();
  };

  execSelect = () => {
    this.logCallTrack({}, primaryCallName, 'execSelect');

    if (!isArray(this.selectListData)) {
      this.selectListData = [];
    }

    const { showSelect } = this.state;

    this.logCallTrace(
      showSelect
        ? { selectData: this.selectListData }
        : { selectData: this.selectListData[0] },
      primaryCallName,
      'selectRecord',
      'select info',
    );

    this.logCallTrace(
      {},
      primaryCallName,
      'execSelect',
      'trigger',
      'hideModal',
    );

    this.hideModal();
  };

  buildColumnFromWrapper = () => {
    const { showSelect } = this.state;

    const list = this.getColumnWrapper() || [];

    if (showSelect) {
      return this.buildColumnList([...list]);
    }

    let hasCustomOperate = false;

    for (const o of list) {
      const { dataTarget: dt } = {
        dataTarget: {},
        ...o,
      };

      const { name } = {
        name: '',
        ...dt,
      };

      if (name === formNameCollection.customOperate.name) {
        hasCustomOperate = true;
      }
    }

    return this.buildColumnList([
      ...list,
      ...(hasCustomOperate
        ? []
        : [
            {
              dataTarget: formNameCollection.customOperate,
              width: this.columnOperateWidth,
              fixed: this.columnOperateFixed,
              showRichFacade: true,
              facadeMode: columnFacadeMode.dropdown,
              hidden: !this.columnOperateVisible,
              configBuilder: (value, record) => {
                const o = this.establishListItemDropdownConfig(record);

                return o || null;
              },
            },
          ]),
    ]);
  };

  renderPresetListViewItemActionSelect = (item, index) => {
    const that = this;

    return buildListViewItemActionSelect({
      confirm: this.confirmSelect,
      index,
      selectData: item,
      selectCallback: (data) => that.selectRecord({ handleData: data || null }),
    });
  };
}

SinglePageModal.defaultProps = {
  width: 820,
};

export { SinglePageSelectModal };
