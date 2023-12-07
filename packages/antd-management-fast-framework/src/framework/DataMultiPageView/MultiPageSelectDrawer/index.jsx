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

import { MultiPageDrawer } from '../MultiPageDrawer';

const primaryCallName = 'DataSinglePageView::MultiPageSelectCoreDrawer';

class MultiPageSelectDrawer extends MultiPageDrawer {
  showListViewItemActionSelect = true;

  batchActionSwitch = true;

  useFrontendPagination = false;

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
    const that = this;

    return buildListViewItemActionSelect({
      confirm: this.confirmSelect,
      index,
      selectData: item,
      selectCallback: (data) => that.selectRecord({ handleData: data || null }),
    });
  };
}

MultiPageSelectDrawer.defaultProps = {
  width: 820,
};

export { MultiPageSelectDrawer };
