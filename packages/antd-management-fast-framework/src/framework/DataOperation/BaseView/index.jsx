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
  };
}

export { BaseView };
