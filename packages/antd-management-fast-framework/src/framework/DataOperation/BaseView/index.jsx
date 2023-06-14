import { Base } from '../Base';

const primaryCallName = 'DataOperation::BaseView';

class BaseView extends Base {
  afterSubmitSuccess = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    this.logCallTrack(
      {
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      },
      primaryCallName,
      'afterSubmitSuccess',
    );

    this.doAfterSubmitSuccess({
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    });

    if (this.updateUrlOnSubmitSuccess) {
      this.logCallTrace(
        {
          singleData,
          listData,
          extraData,
          responseOriginalData,
          submitData,
        },
        primaryCallName,
        'trigger',
        'reloadByUrl',
      );

      this.reloadByUrl();
    }
  };
}

export { BaseView };
