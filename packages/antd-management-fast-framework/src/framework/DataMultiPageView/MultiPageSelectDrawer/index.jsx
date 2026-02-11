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
  buildListViewItemInner,
  buildListViewItemInnerWithSelectButton,
  iconBuilder,
} from 'antd-management-fast-component';

import { MultiPageDrawer } from '../MultiPageDrawer';

const primaryCallName = 'DataSinglePageView::MultiPageSelectCoreDrawer';

/**
 * DataSinglePageView.MultiPageSelectCoreDrawer
 * @namespace
 */
class MultiPageSelectDrawer extends MultiPageDrawer {
  showListViewItemActionSelect = true;

  batchActionSwitch = true;

  useFrontendPagination = false;

  /**
   * 是否保持选中状态
   */
  whetherKeepSelect = false;

  /**
   * 指定使用选择确认模式, 默认 false, 不使用二次选择确认时可不用特殊指定
   */
  confirmSelect = false;

  /**
   * 已选择的数据集合
   */
  selectListData = [];

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  /**
   * 切换为隐藏状态后，doOtherWhenChangeVisibleToHide 执行后的附加逻辑，如无必要，请勿重写。
   * @function
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToHide',
    );

    if (!this.whetherKeepSelect) {
      this.selectListData = [];

      this.setState({
        selectedDataTableDataRows: [],
      });
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

  // eslint-disable-next-line no-unused-vars
  onBatchActionClick = (list) => {
    this.execSelect();
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    this.logCallTrack({}, primaryCallName, 'renderPresetListViewItemInner');

    this.logCallTrace(
      {},
      primaryCallName,
      'renderPresetListViewItemInner',
      'establishPresetListViewItemInnerConfig',
    );

    const listViewItemInnerConfig = this.establishPresetListViewItemInnerConfig(
      item,
      index,
    );

    const listViewItemLayout = this.establishListViewItemLayout();

    const that = this;

    if (listViewItemLayout !== 'vertical') {
      return buildListViewItemInner({
        ...listViewItemInnerConfig,
        layout: listViewItemLayout,
      });
    }

    return buildListViewItemInnerWithSelectButton({
      ...listViewItemInnerConfig,
      layout: listViewItemLayout,
      confirm: this.confirmSelect,
      selectData: item,
      selectButtonType: 'default',
      selectCallback: (data) => that.selectRecord({ handleData: data || null }),
    });
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '选择',
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
      'hideDrawer',
    );

    this.hideDrawer();
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
    const listViewItemLayout = this.establishListViewItemLayout();

    if (listViewItemLayout === 'vertical') {
      return null;
    }

    const that = this;

    return buildListViewItemActionSelect({
      confirm: that.confirmSelect,
      index,
      selectButtonType: 'default',
      selectData: item,
      selectCallback: (data) => that.selectRecord({ handleData: data || null }),
    });
  };
}

MultiPageSelectDrawer.defaultProps = {
  width: 820,
};

export { MultiPageSelectDrawer };
