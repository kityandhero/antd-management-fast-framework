import { BaseFormModal } from '../BaseFormModal';

const primaryCallName = 'DataModal::Base';

class BaseLoadModal extends BaseFormModal {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

    if (this.reloadWhenShow) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToShow',
        'trigger',
        'resetTargetForm',
      );

      this.resetTargetForm();

      this.logCallTrace(
        {
          parameter: {
            dataLoading: true,
          },
        },
        primaryCallName,
        'doOtherWhenChangeVisibleToShow',
        'trigger',
        'reloadData',
      );

      this.reloadData({ dataLoading: true }, null, 300);
    }
  };

  buildOkText = () => {
    return '确定';
  };
}

export { BaseLoadModal };
