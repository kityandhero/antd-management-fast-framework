import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  showSuccessNotification,
} from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';
import {
  buildListViewItemActionSelect,
  iconBuilder,
} from 'antd-management-fast-component';

import { MultiPageModal } from '../MultiPageModal';

const primaryCallName = 'DataSinglePageView::MultiPageSelectModal';

class MultiPageSelectModal extends MultiPageModal {
  showListViewItemActionSelect = true;

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

    if (!isArray(this.selectListData)) {
      this.selectListData = [];
    }

    const { multiSelect, hideAfterSelect } = this.props;

    if (multiSelect) {
      this.selectListData.push(handleData);
    } else {
      this.selectListData = [handleData];
    }

    this.selectChanged = true;

    this.logCallTrace(
      multiSelect
        ? { selectData: this.selectListData }
        : { selectData: this.selectListData[0] },
      primaryCallName,
      'selectRecord',
      'select info',
    );

    if (!multiSelect && hideAfterSelect) {
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

MultiPageSelectModal.defaultProps = {
  width: 820,
  multiSelect: false,
  hideAfterSelect: true,
};

export { MultiPageSelectModal };
