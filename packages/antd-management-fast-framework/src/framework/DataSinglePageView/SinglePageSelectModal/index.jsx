import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  showSimpleErrorMessage,
  showSuccessNotification,
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

class SinglePageSelectModal extends SinglePageModal {
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

  /**
   * 选择状态是否发生变化
   */
  selectChanged = false;

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
      'reset selectListData => [] and selectChanged => false',
    );

    this.selectListData = [];
    this.selectChanged = false;
  };

  doOtherWhenChangeVisibleToHide = () => {
    if (!this.selectChanged) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
        'ignore when no change in selection',
      );

      return;
    }

    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToHide');

    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
      );

      afterSelectSuccess(this.selectListData);
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

  onBatchActionClick = () => {
    const text = 'onBatchActionClick need be override';

    showSimpleErrorMessage(text);
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

  // eslint-disable-next-line no-unused-vars
  buildSelectNotificationDescription = (data) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildSelectNotificationDescription',
      emptyLogic,
    );

    return '';
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

    this.selectChanged = true;

    this.execSelect();
  };

  execSelect = () => {
    this.logCallTrack({}, primaryCallName, 'execSelect');

    if (!isArray(this.selectListData)) {
      this.selectListData = [];
    }

    const { hideAfterSelect } = this.props;
    const { showSelect } = this.state;

    this.logCallTrace(
      showSelect
        ? { selectData: this.selectListData }
        : { selectData: this.selectListData[0] },
      primaryCallName,
      'selectRecord',
      'select info',
    );

    if (!showSelect && hideAfterSelect) {
      this.hideModal();
    } else {
      const text = this.buildSelectNotificationDescription(this.selectListData);

      if (checkStringIsNullOrWhiteSpace(text)) {
        this.logCallTrace(
          {},
          primaryCallName,
          'selectRecord',
          'showSuccessNotification',
          'ignore when message is empty',
        );
      } else {
        this.logCallTrace(
          {},
          primaryCallName,
          'selectRecord',
          'showSuccessNotification',
        );

        showSuccessNotification({
          title: '操作结果',
          description: text,
          placement: 'bottomLeft',
        });
      }
    }
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
  multiSelect: false,
  hideAfterSelect: true,
};

export { SinglePageSelectModal };
