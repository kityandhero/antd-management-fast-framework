import { Base } from '../Base';

const primaryCallName = 'DataModal::Base';

class BaseLoadModal extends Base {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

    if (this.reloadWhenShow) {
      this.resetTargetForm();

      this.reloadData({ dataLoading: true }, null, 300);
    }
  };

  buildOkText = () => {
    return '确定';
  };
}

export { BaseLoadModal };
